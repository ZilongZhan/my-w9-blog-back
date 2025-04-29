import { Model } from "mongoose";
import { Response } from "express";
import { PostsRequest } from "../types.js";
import { PostStructure } from "../../types.js";
import { recipe1, recipe2 } from "../../fixtures.js";
import PostController from "../PostController.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

describe("Given the deletePost method of PostController", () => {
  const postModel = {
    findByIdAndDelete: jest.fn().mockReturnValue(recipe1),
  } as Pick<Model<PostStructure>, "findByIdAndDelete">;

  const postController = new PostController(postModel as Model<PostStructure>);

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a request with recipe 1's ID and a response", () => {
    const req = {
      params: { postId: recipe1._id },
    } as Pick<PostsRequest, "params">;

    test("Then it should call the response's status method with status code 200", async () => {
      await postController.deletePost(
        req as PostsRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
    });

    test("Then it should call the response's json method with recipe 1", async () => {
      await postController.deletePost(
        req as PostsRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(recipe1);
    });
  });

  describe("When it receives a request with '12345' as ID and a next function", () => {
    const req = {
      params: { postId: "12345" },
    } as Pick<PostsRequest, "params">;

    test("Then it should call the next function with error 400 'Invalid post ID", async () => {
      const error = new ServerError(statusCodes.BAD_REQUEST, "Invalid post ID");

      await postController.deletePost(
        req as PostsRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with recipe 2's ID which doesn't exist and a next function", () => {
    const postModel = {
      findByIdAndDelete: jest.fn().mockReturnValue(null),
    } as Pick<Model<PostStructure>, "findByIdAndDelete">;

    const postController = new PostController(
      postModel as Model<PostStructure>,
    );

    const req = {
      params: { postId: recipe2._id },
    } as Pick<PostsRequest, "params">;

    test("Then it should call the next funciton with error 404 'Post with ID 68068eedaad91c08b13ed668 doesn't exist'", async () => {
      await postController.deletePost(
        req as PostsRequest,
        res as Response,
        next,
      );

      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "Post with ID 68068eedaad91c08b13ed668 doesn't exist",
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
