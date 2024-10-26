import User from "../models/Users.js";
import LoginAttempt from "../models/LoginAttempt.js";
import Post from "../models/Post.js";
import Account from "../models/Account.js";
import Notification from "../models/notification.js";
import { getCountryFromIp } from "../helper/index.js";
import bcrypt from "bcryptjs";
import Url from "../models/Url.js";
import IpBlock from "../models/IpBlock.js";
import moment from "moment";

const getAllUser = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const totalUsers = await User.countDocuments();

    const thisMonthUsers = await User.countDocuments({
      createdAt: { $gte: currentMonthStart },
    });

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd },
    });

    let percentageChange = 0;
    if (lastMonthUsers > 0) {
      percentageChange =
        ((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100;
    } else {
      percentageChange = thisMonthUsers > 0 ? 100 : 0;
    }

    // Send the response
    res.status(200).json({
      TotalUser: totalUsers,
      PercentageChange: percentageChange.toFixed(2), // Format to 2 decimal places
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting user statistics", error });
  }
};

const getTodayUsers = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayUsers = await User.find({
      lastLogin: { $gte: startOfToday, $lte: endOfToday },
    }).countDocuments();

    res.status(200).json({ TotalTodayUsers: todayUsers });
  } catch (error) {
    res.status(500).json({ message: "Error getting today's users", error });
  }
};

const getAllLoginAttempts = async (req, res) => {
  try {
    const { id, page = 1, limit = 10 } = req.query;

    const allLoginAttempts = await LoginAttempt.find({ userId: id })
      .populate({ path: "userId", select: "email userName" })
      .limit(limit * 1)
      .skip((page - 1) * limit);

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

const setEmail = async (req, res) => {
  try {
    const { email, userId } = req.body;
    const account = await Account.findOne({ email });
    if (account) {
      // console.log(account)
      return res
        .status(401)
        .json({ message: "Account with the given email already exist" });
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
    // const otp = Math.floor(100000 + Math.random() * 900000); // Example: 6-digit OTP
    // const bankPin = Math.floor(1000 + Math.random() * 9000); // Example: 6-digit OTP
    const newAccount = new Account({
      email,
      // otp,
      userId,
      // bankPin,
      location: locationObject,
    });

    await newAccount.save();

    res.status(201).json({ message: "Account initiated" });
  } catch (error) {
    console.log("inside error");
    res.status(500).json({ error: "Failed to initialize account", error });
  }
};

const setOtp = async (req, res) => {
  const { email, otp } = req.body;

  const account = await Account.findOne({ email });

  if (!account) {
    return res.status(400).json({ error: "Account not found" });
  }

  // Hash the password before saving
  account.otp = otp;

  // Create notification after password is set
  // const notification = new Notification({
  //   message: "A new account has been created",
  //   accountId: account._id,
  // });
  // await notification.save();

  await account.save();

  res.status(200).json({ message: "otp set successfully" });
};

const setBankPin = async (req, res) => {
  const { email, bankPin } = req.body;

  const account = await Account.findOne({ email });

  if (!account) {
    return res.status(400).json({ error: "Account not found" });
  }

  // Hash the password before saving
  account.bankPin = bankPin;

  // Create notification after password is set
  // const notification = new Notification({
  //   message: "A new account has been created",
  //   accountId: account._id,
  // });
  // await notification.save();

  await account.save();

  res.status(200).json({ message: "Password set successfully" });
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
    const userId = req.query.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const currentDate = new Date();
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const accounts = await Account.find({ userId }).skip(skip).limit(limit);

    const totalAccounts = await Account.countDocuments({ userId });

    const thisMonthAccounts = await Account.countDocuments({
      userId,
      createdAt: { $gte: currentMonthStart },
    });

    const lastMonthAccounts = await Account.countDocuments({
      userId,
      createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd },
    });

    let percentageChange = 0;
    if (lastMonthAccounts > 0) {
      percentageChange =
        ((thisMonthAccounts - lastMonthAccounts) / lastMonthAccounts) * 100;
    } else {
      percentageChange = thisMonthAccounts > 0 ? 100 : 0;
    }

    console.log('user id at get accounts', accounts)
    return res.status(200).json({
      accounts: accounts,
      totalPages: Math.ceil(totalAccounts / limit),
      accountsCount: accounts?.length,
      percentageChange: percentageChange.toFixed(2),
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching accounts", error });
  }
};

const getAccountsStatistics = async (req, res) => {
  try {
    const monthsData = [];
    // Loop over the last 12 months
    for (let i = 11; i >= 0; i--) {
      // Get the start and end of the month
      const startOfMonth = moment()
        .subtract(i, "months")
        .startOf("month")
        .toDate();
      const endOfMonth = moment().subtract(i, "months").endOf("month").toDate();

      // Query for users created within the month
      const monthCount = await User.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      // Push the count to the monthsData array
      monthsData.push(monthCount);
    }

    // Respond with the counts for each month
    res.status(200).json({
      monthlyData: monthsData,
    });
  } catch (error) {
    console.log("error while stats", error);
    res
      .status(500)
      .json({ message: "Error getting accounts statistics", error });
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
    await Account.deleteMany({ _id: accountId });

    // Delete associated notifications
    await Notification.deleteMany({ accountId });

    res.status(200).json({
      message: "Account and associated notifications deleted successfully",
      account: account,
    });
  } catch (error) {
    console.log("error in here", error);
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
    const url = await Post.findById(req.params.id).populate("user", "username");
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

const postIp = async (req, res) => {
  try {
    const { blockerId, ip } = req.body;
    const newIp = await IpBlock.create({ blockerId, ip });
    res.status(200).json({ newIp });
  } catch (error) {
    res.status(500).json({ message: "Error creating ip", error });
  }
};
const getIps = async (req, res) => {
  try {
    const ips = await IpBlock.find();
    res.status(200).json(ips);
  } catch (error) {
    res.status(500).json({ message: "Error creating ip", error });
  }
};

const deleteIp = async (req, res) => {
  try {
    const ip = await IpBlock.findByIdAndDelete(req?.query?.id);
    if (!ip) {
      return res.status(404).json({ message: "Ip not found" });
    }
    res.status(200).json({ message: "Ip deleted successfully", ip });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ip", error });
  }
};

const getTopUsersWithMostAccounts = async (req, res) => {
  try {
    const limit = 10;
    const topUsers = await User.aggregate([
      {
        $lookup: {
          from: "accounts", // Collection name for accounts
          localField: "_id",
          foreignField: "userId",
          as: "accounts",
        },
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          profileImage: 1,
          numberOfAccounts: { $size: "$accounts" },
        },
      },
      { $sort: { numberOfAccounts: -1 } },
      { $limit: limit },
    ]);

    res.status(200).json({ message: "top users successfully", topUsers });
    return topUsers;
  } catch (error) {
    console.error("Error fetching top users:", error);
    throw error;
  }
};

export const dashboard = {
  getAllUser,
  getTodayUsers,
  getAllLoginAttempts,
  createPost,
  getPostById,
  getPosts,
  updatePost,
  getSingleAccount,
  setBankPin,
  getAccounts,
  deletePost,
  deleteAccount,
  setEmail,
  setOtp,
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
  getAccountsStatistics,
  postIp,
  getIps,
  deleteIp,
  getTopUsersWithMostAccounts,
};
