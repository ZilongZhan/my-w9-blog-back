import { Request, Response } from "express";

export interface PostControllerStructure {
  getPage: (req: Request, res: Response) => void;
}
