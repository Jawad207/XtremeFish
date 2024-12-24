import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: false, unique: false, sparse: true },
    profileImage: { type: String },
    coverImage: { type: String },
    userName: { type: String, required: false },
    password: { type: String, required: false, default: null },
    role: {type: String, default: "admin"},//we can have multiple roles here basic, premium ,admin
    bio: { type: String, required: false, default: "" },
    isVerified: { type: Boolean, default: false },
    otp: { type: Number, default: 0 },
    otpExpiration: { type: Date, default: Date.now },
    isOtpVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    admin: { type: Boolean, default: true },
    deletedAt: { type: Date },
    location: { type: Object },
    lastLogin: {type : Date, default: Date.now()}
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
