import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  status: { type: String, required: true }, // 'success' or 'failed'
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //userId
  description: { type: String, required: true },
  title: {type: String, default: ""}
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
