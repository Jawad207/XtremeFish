import { Schema, mongoose } from "mongoose";
const notificationSchema = new Schema({
    message: { type: String, required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Account' },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.model('Notification', notificationSchema);
  