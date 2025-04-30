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
      min: 5,
      max: 50,
    },
    imageUrl: {
      type: String,
      required: true,
      match: [
        /^http AND \.(jpg|jpeg|png|gif|webp)$/i,
        "Invalid media/url format",
      ],
    },
    imageAlt: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    tags: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
      min: 100,
      max: 1000,
    },
    author: {
      type: String,
      required: true,
      min: 2,
      max: 70,
    },
  },
  {
    versionKey: false,
  },
);

const Post = mongoose.model("Post", PostSchema, "posts");

export default Post;
