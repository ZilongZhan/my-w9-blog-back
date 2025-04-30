import mongoose, { Schema } from "mongoose";
import { PostStructure } from "../types.js";

const PostSchema = new Schema<PostStructure>(
  {
    publishDate: {
      type: Date,
      default: Date.now(),
    },
    title: {
      type: String,
      required: true,
      minlength: [5, "Minimum 5 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
    },
    imageUrl: {
      type: String,
      required: true,
      match: [/\.(jpg|jpeg|png|gif|webp)$/i, "Invalid media/url format"],
    },
    imageAlt: {
      type: String,
      required: true,
      minlength: [5, "Minimum 5 characters required"],
      maxlength: [100, "Maximum 100 characters allowed"],
    },
    tags: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: [200, "Minimum 200 characters required"],
      maxlength: [3000, "Maximum 3000 characters allowed"],
    },
    author: {
      type: String,
      required: true,
      minlength: [2, "Minimum 2 characters required"],
      maxlength: [70, "Maximum 70 characters allowed"],
    },
  },
  {
    versionKey: false,
  },
);

const Post = mongoose.model("Post", PostSchema, "posts");

export default Post;
