import { Router } from "express";
import PostController from "../controller/PostController.js";
import Post from "../model/Post.js";

const postRouter = Router();

const postController = new PostController(Post);

postRouter.get("/", postController.getPage);

export default postRouter;
