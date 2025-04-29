import { NextFunction, Request, Response } from "express";

export interface PostControllerStructure {
  getPosts: (req: PostsRequest, res: Response) => void;
  addPost: (req: PostsRequest, res: Response, next: NextFunction) => void;
  deletePost: (req: PostsRequest, res: Response, next: NextFunction) => void;
}

export interface PostsQuery {
  pageNumber: string;
}

export interface PostsBody {
  postId: string;
}

export type PostsRequest = Request<PostsBody, object, object, PostsQuery>;
