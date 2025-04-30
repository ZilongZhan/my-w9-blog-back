import { NextFunction, Request, Response } from "express";
import { PostDataDto } from "../dto/types.js";

export interface PostControllerStructure {
  getPosts: (req: PostsRequest, res: Response) => void;
  addPost: (req: PostsRequest, res: Response, next: NextFunction) => void;
  deletePost: (req: PostsRequest, res: Response, next: NextFunction) => void;
}

export interface PostsQuery {
  pageNumber: string;
}

export type PostModel = PostDataDto;

export interface PostsBody {
  postId: string;
}

export type PostsRequest = Request<PostsBody, object, PostModel, PostsQuery>;
