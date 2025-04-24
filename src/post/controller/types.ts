import { Request, Response } from "express";
import { Query } from "express-serve-static-core";

export interface PostControllerStructure {
  getPosts: (req: PostsRequest, res: Response) => void;
}

export interface PostsQuery extends Query {
  pageNumber: string;
}

export type PostsRequest = Request<object, object, object, PostsQuery>;
