import mongoose, { Schema } from "mongoose";
import { PostStructure } from "../types.js";

const PostSchema = new Schema<PostStructure>({
  publishDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema, "posts");

export default Post;
