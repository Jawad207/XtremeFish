import User from "../models/Users.js";
import LoginAttempt from "../models/LoginAttempt.js";

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

export const dashboard = {
  getAllUser,
  getAllLoginAttempts,
};
