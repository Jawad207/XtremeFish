
import User from "../models/Users.js";
import LoginAttempt from "../models/LoginAttempt.js"

// Sign-Up Function
const getAllUser = async (req, res) => {

  try {
    const Alluser = await User.find().countDocuments()
    res.status(200).json({TotalUser: Alluser})
} catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};

const getAllLoginAttempts = async (req, res) => {
  try {
    const {id} = req.query
    const allLoginAttempts = await LoginAttempt.find({userId: id})
    res.status(200).json({loginAttempts: allLoginAttempts})

  } catch (error) {
    res.status(500).json({ message: error.message, error });
    
  }
}

export const dashboard = {
  getAllUser,
  getAllLoginAttempts
};
