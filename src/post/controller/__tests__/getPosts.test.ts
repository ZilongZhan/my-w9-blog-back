import { Request, Response } from "express";
import { Model, Query } from "mongoose";
import { PostStructure } from "../../types.js";
import PostController from "../PostController.js";
import * as fixturePosts from "../../fixtures.js";
import statusCodes from "../../../globals/statusCodes.js";

describe("Given the getPosts method of PostController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Pick<Response, "status" | "json">;

  const postsTotal = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a request and a response", () => {
    const posts = [
      fixturePosts.recipe1,
      fixturePosts.recipe2,
      fixturePosts.recipe3,
      fixturePosts.recipe4,
      fixturePosts.recipe5,
    ];

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
      countDocuments: jest.fn().mockReturnValue(postsTotal),
    } as Pick<Model<PostStructure>, "find">;

    const postController = new PostController(
      postsModel as Model<PostStructure>,
    );

    const req = {
      query: {},
    } as Pick<Request, "query">;

    test("Then it should call the response's status method with status code 200", async () => {
      const expectedStatusCode = statusCodes.OK;

      await postController.getPosts(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with recipes 1 to 5", async () => {
      await postController.getPosts(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ posts }));
    });

    test("Then it should call the response's json method with 10 total posts", async () => {
      await postController.getPosts(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ postsTotal }),
      );
    });
  });

  describe("When it receives a request with pageNumber 2 and a response", () => {
    test("Then it should call the reponse's json method with recipes 6 to 10", async () => {
      const posts = [
        fixturePosts.recipe6,
        fixturePosts.recipe7,
        fixturePosts.recipe8,
        fixturePosts.recipe9,
        fixturePosts.recipe10,
      ];

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
        countDocuments: jest.fn().mockReturnValue(postsTotal),
      } as Pick<Model<PostStructure>, "find">;

      const postController = new PostController(
        postsModel as Model<PostStructure>,
      );

      const req = {
        query: {
          pageNumber: "2",
        },
      } as Pick<Request, "query">;

      await postController.getPosts(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ posts }));
    });
  });
});
