import bcrypt from "bcryptjs";
import User from "../models/Users.js";

// Sign-Up Function
const getAllUser = async (req, res) => {

  try {
    const Alluser = await User.find().countDocuments()
    res.status(200).json({TotalUser: Alluser})
} catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};

export const dashboard = {
  getAllUser,
};
