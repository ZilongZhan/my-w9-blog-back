import { Response } from "express";
import { PostControllerStructure, PostsRequest } from "./types.js";
import { Model } from "mongoose";
import { PostStructure } from "../types.js";
import statusCodes from "../../globals/statusCodes.js";

class PostController implements PostControllerStructure {
  constructor(private posts: Model<PostStructure>) {}

  public getPosts = async (req: PostsRequest, res: Response): Promise<void> => {
    let { pageNumber } = req.query;

    if (!pageNumber) {
      pageNumber = "1";
    }

    const toStartingPosition = (Number(pageNumber) - 1) * 5;
    const postsLimit = 5;

    const posts = await this.posts
      .find<PostStructure>({})
      .sort({ publishDate: -1 })
      .skip(toStartingPosition)
      .limit(postsLimit)
      .exec();

    const postsTotal = await this.posts.countDocuments();

    res.status(statusCodes.OK).json({ posts, postsTotal });
  };
}

export default PostController;
