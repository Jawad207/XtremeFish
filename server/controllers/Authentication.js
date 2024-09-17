import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import LoginAttempt from "../models/LoginAttempt.js";
import { generateToken } from "../helper/index.js";
import nodemailer from "nodemailer";
import requestIp from "request-ip";

// Sign-Up Function
const SignUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (userName && email && password) {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ message: "User with the given Email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(200).json({ data: newUser });
    } else {
      res.status(400).json({ message: "ALL three fields are required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Sign-In Function
const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    //fb47c4f6c5f35108b65cb90b1c3ddeaa
    const user = await User.findOne({ email });
    if (!user) {
      await new LoginAttempt({
        status: "failed",
        description: "Invalid Email",
        userId: null,
      }).save();
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Record failed login attempt
      await new LoginAttempt({
        status: "failed",
        description: "Invalid Password",
        userId: user._id,
      }).save();
      return res.status(401).json({ message: "Invalid password" });
    }

    await new LoginAttempt({
      status: "success",
      description: "Login successful",
      userId: user._id,
    }).save();

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Set OTP expiration time (e.g., 10 minutes from now)
    const otpExpiration = Date.now() + 10 * 60 * 1000;
    // Update the user's record with the OTP and expiration time
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Set up nodemailer to send the OTP with HTML content
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jawadulhassan18@gmail.com", // your email
        pass: "txdp pyrp ysnb vbiy", // your email password
      },
    });

    const mailOptions = {
      from: "adeebasajid4506@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #333333;
            }
            p {
              color: #666666;
              line-height: 1.5;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #e94e77;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #999999;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h2>Password Reset Request</h2>
            <p>Dear User,</p>
            <p>You have requested to reset your password. Please use the following OTP code to proceed:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for the next 10 minutes. If you did not request a password reset, please ignore this email.</p>
            <p>Thank you, <br> Your Company Name</p>
            <div class="footer">
              <p>© 2024 Your Company Name. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error while sending mail", error);
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
};

const confirmOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the OTP is valid and not expired
    if (user.otp != otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    } else {
      res.status(200).json({ message: "Otp Verified" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
};
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the OTP is valid and not expired

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and clear the OTP fields
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log("error at forget password");
    res.status(500).json({ message: "Error processing request" });
  }
};

const browserInfo = async (req, res) => {
  console.log("browser info got called");
  const ip = requestIp.getClientIp(req);
  console.log("ip from the browser", ip);
};

// Parent auth function
export const auth = {
  SignUp,
  SignIn,
  confirmOtp,
  forgotPassword,
  resetPassword,
  browserInfo,
};