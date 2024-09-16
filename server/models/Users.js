import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: false, unique: false, sparse: true },
    profileUrl: { type: String },
    userName: { type: String, required: false },
    password: { type: String, required: false, default: null },
    bio: { type: String, required: false, default: "" },
    isVerified: { type: Boolean, default: false },
    otp: { type: Number, default: 0 },
    otpExpiration: { type: Date, default: Date.now },
    isOtpVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },

    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
