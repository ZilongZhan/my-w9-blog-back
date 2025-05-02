import { NextFunction, Response } from "express";
import { PostControllerStructure, PostsRequest } from "./types.js";
import { isValidObjectId, Model } from "mongoose";
import { PostStructure } from "../types.js";
import statusCodes from "../../globals/statusCodes.js";
import { mapPostDataDtoToPostData } from "../dto/mappers.js";
import ServerError from "../../server/ServerError/ServerError.js";
import Post from "../model/Post.js";

class PostController implements PostControllerStructure {
  constructor(private postModel: Model<PostStructure>) {}

  public getPosts = async (req: PostsRequest, res: Response): Promise<void> => {
    let { pageNumber } = req.query;

    if (!pageNumber) {
      pageNumber = "1";
    }

    const toStartingPosition = (Number(pageNumber) - 1) * 5;
    const postsLimit = 5;

    const posts = await this.postModel
      .find<PostStructure>({})
      .sort({ publishDate: -1 })
      .skip(toStartingPosition)
      .limit(postsLimit)
      .exec();

    const postsTotal = await this.postModel.countDocuments();

    res.status(statusCodes.OK).json({ posts, postsTotal });
  };

  public addPost = async (
    req: PostsRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const postDataDto = req.body;

    const isNotValidPostData = new Post(postDataDto).validateSync();

    if (isNotValidPostData) {
      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        isNotValidPostData.message,
      );

      next(error);
      return;
    }

    const existingPost = await this.postModel.findOne({
      title: postDataDto.title,
    });

    if (existingPost) {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "Post with this title already exists",
      );

      next(error);
      return;
    }

    const postData = mapPostDataDtoToPostData(postDataDto);
    const post: PostStructure = await this.postModel.create(postData);

    res.status(statusCodes.CREATED).json({ post });
  };

  public deletePostById = async (
    req: PostsRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { postId } = req.params;

    const isValidId = isValidObjectId(postId);

    if (!isValidId) {
      const error = new ServerError(statusCodes.BAD_REQUEST, "Invalid post ID");

      next(error);
      return;
    }

    const post = await this.postModel.findByIdAndDelete<PostStructure>(postId);

    if (!post) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        `Post with ID ${postId} doesn't exist`,
      );

      next(error);
      return;
    }

    res.status(statusCodes.OK).json({ post });
  };

  public getPostById = async (
    req: PostsRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { postId } = req.params;

    const isValidId = isValidObjectId(postId);

    if (!isValidId) {
      const error = new ServerError(statusCodes.BAD_REQUEST, "Invalid post ID");

      next(error);
      return;
    }

    const post = await this.postModel.findById(postId);

    if (!post) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        `Post with ID ${postId} doesn't exist`,
      );

      next(error);
      return;
    }

    res.status(statusCodes.OK).json({ post });
  };
}

export default PostController;
