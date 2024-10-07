import User from "../models/Users.js";
import LoginAttempt from "../models/LoginAttempt.js";
import Post from "../models/Post.js";
import Account from "../models/Account.js";
import Notification from "../models/notification.js";
import { getCountryFromIp } from "../helper/index.js";
import bcrypt from "bcryptjs";
import Url from "../models/Url.js";
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
    const { title, description, userId } = req.body;

    const post = await Post.findByIdAndUpdate(
      req?.query?.id,
      { title, description, timestamp: Date.now(), user: userId },
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
    const { email, userId } = req.body;

    const account = await Account.findOne({ email });
    if (account) {
      res
        .status(401)
        .json({ message: "Account with the given email already exist" });
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
    const bankPin = Math.floor(1000 + Math.random() * 9000); // Example: 6-digit OTP

    const newAccount = new Account({
      email,
      otp,
      userId,
      bankPin,
      location: locationObject,
    });

    await newAccount.save();

    res.status(201).json({ message: "OTP generated and account initiated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate OTP", error });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  

  // Find the account with the email and otp
  const account = await Account.findOne({ email, otp});

  if (!account) {
    return res.status(400).json({ error: "Invalid OTP or email" });
  }

  if(account.otp===otp){
    res.status(200).json({ message: "OTP verified" });
  }
  // Clear OTP after successful verification
};

const verifyBankPin = async (req, res) => {
  const { email, bankPin } = req.body;

  // Find the account with the email and otp
  const account = await Account.findOne({ email, bankPin });
  // console.log(account.email, account.bankPin)
  if (!account) {
    return res.status(400).json({ error: "Invalid Bank otp or email" });
  }
  res.status(200).json({ message: "Bank otp verified" });
};

const setPassword = async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ email });

  if (!account) {
    return res.status(400).json({ error: "Account not found" });
  }

  // Hash the password before saving
  account.password = password;

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
    const userId = req.query.id;

    // Get pagination parameters from query (default to page 1, limit 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find all accounts for the user with pagination
    const accounts = await Account.find({ userId }).skip(skip).limit(limit);

    // Get the total count of accounts without pagination
    const totalAccounts = await Account.countDocuments({ userId });

    return res.status(200).json({
      accounts: accounts,
      totalAccounts: totalAccounts, // Total number of accounts
      currentPage: page,
      totalPages: Math.ceil(totalAccounts / limit), // Calculate total pages
      accountsCount: accounts?.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching accounts", error });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    // Fetch the logged-in user's userId

    // Get pagination parameters from query (default to page 1, limit 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find all accounts for the user with pagination
    const accounts = await Account.find().skip(skip).limit(limit);

    // Get the total count of accounts without pagination
    const totalAccounts = await Account.countDocuments({});

    return res.status(200).json({
      accounts: accounts,
      totalAccounts: totalAccounts, // Total number of accounts
      currentPage: page,
      totalPages: Math.ceil(totalAccounts / limit), // Calculate total pages
      accountsCount: accounts?.length,
    });
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

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ deleted: false });
    if (!notifications) {
      return res.status(404).json({ message: "No notifications found" });
    }
    return res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

const getNotification = async () => {
  try {
    const notification = await Notification.findById(req.query.id);

    if (!notification) {
      return res.status(404).json({ message: "No notification found" });
    }
    return res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};
const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.query.id;
    if (!notificationId) {
      return res.status(404).json({ message: "notification id is required" });
    }
    const notificaion = await Notification.findByIdAndUpdate(
      notificationId,
      { deleted: true },
      { new: true }
    );

    if (!notificaion) {
      return res.status(404).json({ message: "notificaion not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const accountId = req.query.id;

    // Find the account by ID
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Delete the account
    await Account.findByIdAndDelete(accountId);
    await Account.deleteMany(accountId);

    // Delete associated notifications
    await Notification.deleteMany({ accountId });

    res.status(200).json({
      message: "Account and associated notifications deleted successfully",
      account: account,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
}; 
const editUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile", error });
  }
};

const createUrl = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const newUrl = await Url.create({ user: userId, title, description });
    res.status(200).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: "Error creating url", error });
  }
};

// Get all posts
const getUrls = async (req, res) => {
  try {
    const urls = await Url.find().populate("user", "userNname"); // Assuming `username` is in your user model
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching urls", error });
  }
};

const getUrlById = async (req, res) => {
  try {
    const url = await Post.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }
    res.status(200).json(url);
  } catch (error) {
    res.status(500).json({ message: "Error fetching url", error });
  }
};

const updateUrl = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const url = await Url.findByIdAndUpdate(
      req?.query?.id,
      { title, description, timestamp: Date.now(), user: userId },
      { new: true }
    );
    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }
    res.status(200).json(url);
  } catch (error) {
    res.status(500).json({ message: "Error updating url", error });
  }
};

const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findByIdAndDelete(req?.query?.id);
    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }
    res.status(200).json({ message: "Url deleted successfully", url });
  } catch (error) {
    res.status(500).json({ message: "Error deleting url", error });
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
  verifyBankPin,
  getAccounts,
  deletePost,
  deleteAccount,
  generateOtpAndSave,
  verifyOtp,
  setPassword,
  getNotifications,
  getNotification,
  editUserProfile,
  deleteNotification,
  getAllAccounts,
  createUrl,
  getUrls,
  getUrlById,
  updateUrl,
  deleteUrl,
};
