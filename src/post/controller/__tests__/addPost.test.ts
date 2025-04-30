import { Model } from "mongoose";
import { PostStructure } from "../../types.js";
import PostController from "../PostController.js";
import { PostsRequest } from "../types.js";
import { macAndCheeseDto, pulledPorkDto } from "../../dto/fixtures.js";
import { Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../../server/ServerError/ServerError.js";

describe("Given the addPost method of PostController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a request with a mac and cheese recipe, and a response", () => {
    const postModel = {
      findOne: jest.fn().mockReturnValue(null),
      create: jest.fn().mockReturnValue(macAndCheeseDto),
    } as Pick<Model<PostStructure>, "findOne">;

    const postController = new PostController(
      postModel as Model<PostStructure>,
    );

    const req = {
      body: macAndCheeseDto,
    } as Pick<PostsRequest, "body">;

    test("Then it should call the response's status method with status code 201", async () => {
      await postController.addPost(req as PostsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's json method with the mac and cheese recipe", async () => {
      await postController.addPost(req as PostsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ post: macAndCheeseDto }),
      );
    });
  });

  describe("When it receives a request with a pulled pork recipe that already exists, and a next function", () => {
    const postModel = {
      findOne: jest.fn().mockReturnValue(pulledPorkDto),
      create: jest.fn().mockReturnValue(macAndCheeseDto),
    } as Pick<Model<PostStructure>, "findOne">;

    const postController = new PostController(
      postModel as Model<PostStructure>,
    );

    const req = {
      body: macAndCheeseDto,
    } as Pick<PostsRequest, "body">;

    test("Then it should call the next function with error 409 'Post with this title already exists'", async () => {
      const expectedError = new ServerError(
        statusCodes.CONFLICT,
        "Post with this title already exists",
      );

      await postController.addPost(req as PostsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with Mac & Cheese recipe by author 'A'", () => {
    test("Then it should call the next function with error 400 'foo'", () => {
      const postModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue(macAndCheeseDto),
      } as Pick<Model<PostStructure>, "findOne">;

      const postController = new PostController(
        postModel as Model<PostStructure>,
      );

      const req = {
        body: { ...macAndCheeseDto, author: "A" },
      } as Pick<PostsRequest, "body">;

      postController.addPost(req as PostsRequest, res as Response, next);

      const error = new ServerError(
        statusCodes.BAD_REQUEST,
        "Post validation failed: author: Minimum 2 characters required",
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
