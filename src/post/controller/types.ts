import { NextFunction, Request, Response } from "express";
import { PostDataDto } from "../dto/types.js";
import { PostsInfo } from "../types.js";

export interface PostControllerStructure {
  getPosts: (req: PostsRequest, res: Response) => void;
  addPost: (req: PostsRequest, res: Response, next: NextFunction) => void;
  deletePostById: (
    req: PostsRequest,
    res: Response,
    next: NextFunction,
  ) => void;
  getPostById: (req: PostsRequest, res: Response, next: NextFunction) => void;
}

export interface PostsQuery {
  pageNumber: string;
}

export type PostModel = PostDataDto;

export interface PostsBody {
  postId: string;
}

export type PostsRequest = Request<PostsBody, object, PostModel, PostsQuery>;

export type GetPostsInfoResponse = PostsInfo;

export interface PostResponse {
  post: PostDataDto;
}

export interface HealthCheckResponse {
  message: string;
}

export type ErrorRespone = {
  error: string;
};
