import User from "../models/Users.js";
import LoginAttempt from "../models/LoginAttempt.js";
import Post from "../models/Post.js";
import Account from "../models/Account.js";
import Notification from "../models/notification.js";
import { getCountryFromIp } from "../helper/index.js";
// Sign-Up Function
const getAllUser = async (req, res) => {
  try {
    const Alluser = await User.find().countDocuments();
    res.status(200).json({ TotalUser: Alluser });
  } catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};
const getAllLoginAttempts = async (req, res) => {
  try {
    const { id, page = 1, limit = 10 } = req.query;

    const allLoginAttempts = await LoginAttempt.find({ userId: id })
      .populate({ path: "userId", select: "email userName" })
      .limit(limit * 1) // Limit the number of results
      .skip((page - 1) * limit); // Skip to the appropriate page

    const totalRecords = await LoginAttempt.countDocuments({ userId: id });

    res.status(200).json({
      loginAttempts: allLoginAttempts,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const newPost = await Post.create({ user: userId, title, description });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "userNname"); // Assuming `username` is in your user model
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, timestamp: Date.now() },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req?.query?.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

const generateOtpAndSave = async (req, res) => {
  try {
    const { email } = req.body;

    const account = await Account.findOne({ email });
    if (account) {
      res.status(401).json({ message: "Account with the given email already exist" });
      return;
    }
    const userLocation = await getCountryFromIp();
    const locationObject = {
      country: userLocation?.country,
      countryCode: userLocation?.countryCode,
      region: userLocation?.region,
      city: userLocation?.city,
      ipAddress: userLocation?.ipAddress,
      lat: userLocation?.lat,
      lon: userLocation?.lon,
    };

    // Generate a 4-6 digit OTP (you can modify this as per your requirements)
    const otp = Math.floor(100000 + Math.random() * 900000); // Example: 6-digit OTP

    const newAccount = new Account({
      email,
      otp,

      location: locationObject,
    });

    await newAccount.save();

    res.status(201).json({ message: "OTP generated and account initiated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate OTP" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  // Find the account with the email and otp
  const account = await Account.findOne({ email, otp });

  if (!account) {
    return res.status(400).json({ error: "Invalid OTP or email" });
  }

  // Clear OTP after successful verification
  await account.save();

  res.status(200).json({ message: "OTP verified" });
};

const setPassword = async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ email });

  if (!account) {
    return res.status(400).json({ error: "Account not found" });
  }

  // Hash the password before saving
  account.password = await bcrypt.hash(password, 10);

  // Create notification after password is set
  const notification = new Notification({
    message: "A new account has been created",
    accountId: account._id,
  });
  await notification.save();

  await account.save();

  res.status(200).json({ message: "Password set successfully" });
};

const getAccounts = async (req, res) => {
  try {
    // Fetch the logged-in user's userId
    const userId = req.user._id;

    // Find all accounts for the user
    const accounts = await Account.find({ userId });

    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching accounts", error });
  }
};

const getSingleAccount = async (req, res) => {
  try {
    const { accountId } = req.params;

    // Fetch the account by ID
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching account", error });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;

    // Find the account by ID
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Delete the account
    await Account.findByIdAndDelete(accountId);

    // Delete associated notifications
    await Notification.deleteMany({ accountId });

    res.status(200).json({
      message: "Account and associated notifications deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

export const dashboard = {
  getAllUser,
  getAllLoginAttempts,
  createPost,
  getPostById,
  getPosts,
  updatePost,
  getSingleAccount,
  getAccounts,
  deletePost,
  deleteAccount,
  generateOtpAndSave,
  verifyOtp,
  setPassword,
};
