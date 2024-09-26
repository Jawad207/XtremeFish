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

const createAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUserId = req.userId; // Assume you are getting the logged-in user's ID from middleware

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

    const newAccount = new Account({
      email,
      password, // Hash the password before saving in a real application
      userId: loggedInUserId,
      location: locationObject,
    });

    await newAccount.save();

    // Generate notification
    const notification = new Notification({
      message: "A new account has been added.",
      accountId: newAccount._id,
    });
    await notification.save();

    res
      .status(201)
      .json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
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

    res
      .status(200)
      .json({
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
  createAccount,
  getSingleAccount,
  getAccounts,
  deletePost,
  deleteAccount,
};
