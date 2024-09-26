// Account.ts (Mongoose Model)

import mongoose, { Schema } from 'mongoose';


const AccountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: "" },
    location: {
      country: String,
      countryCode: String,
      region: String,
      city: String,
      ipAddress: String,
      lat: Number,
      lon: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Account', AccountSchema);
