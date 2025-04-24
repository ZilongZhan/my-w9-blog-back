import { Request, Response } from "express";

export interface PostControllerStructure {
  getPosts: (req: Request, res: Response) => void;
}
