import { NextFunction, Request, Response } from "express";

export interface PostControllerStructure {
  getPosts: (req: PostsRequest, res: Response) => void;
  addPost: (req: PostsRequest, res: Response, next: NextFunction) => void;
}

export interface PostsQuery {
  pageNumber: string;
}

export type PostsRequest = Request<object, object, object, PostsQuery>;
