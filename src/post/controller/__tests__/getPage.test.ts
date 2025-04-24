import { Request, Response } from "express";
import { Model, Query } from "mongoose";
import { PostStructure } from "../../types.js";
import PostController from "../PostController.js";
import {
  recipe1,
  recipe10,
  recipe2,
  recipe3,
  recipe4,
  recipe5,
  recipe6,
  recipe7,
  recipe8,
  recipe9,
} from "../../fixtures.js";

describe("Given the getPage method of PostController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a request and a response", () => {
    const posts = [recipe1, recipe2, recipe3, recipe4, recipe5];

    const query = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockReturnValue(posts),
    } as Pick<
      Query<PostStructure[], PostStructure>,
      "sort" | "skip" | "limit" | "exec"
    >;

    const postsModel = {
      find: jest.fn().mockReturnValue(query),
    } as Pick<Model<PostStructure>, "find">;

    const postController = new PostController(
      postsModel as Model<PostStructure>,
    );

    const req = {
      query: {},
    } as Pick<Request, "query">;

    test("Then it should call the response's status method with status code 200", async () => {
      await postController.getPage(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's json method with recipes 1 to 5", async () => {
      await postController.getPage(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ posts });
    });
  });

  describe("When it receives a request with pageNumber 2 and a response", () => {
    test("Then it should call the reponse's json method with recipes 6 to 10", async () => {
      const posts = [recipe6, recipe7, recipe8, recipe9, recipe10];

      const query = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockReturnValue(posts),
      } as Pick<
        Query<PostStructure[], PostStructure>,
        "sort" | "skip" | "limit" | "exec"
      >;

      const postsModel = {
        find: jest.fn().mockReturnValue(query),
      } as Pick<Model<PostStructure>, "find">;

      const postController = new PostController(
        postsModel as Model<PostStructure>,
      );

      const req = {
        query: {
          pageNumber: "2",
        },
      } as Pick<Request, "query">;

      await postController.getPage(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ posts });
    });
  });
});
