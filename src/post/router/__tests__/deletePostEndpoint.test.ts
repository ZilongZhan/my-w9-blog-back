import request from "supertest";
import app from "../../../server/app.js";
import {
  macAndCheeseDocumentDto,
  oatsWithBerriesDocumentDto,
} from "../../dto/fixtures.js";
import { ErrorRespone, PostResponse } from "../../controller/types.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import Post from "../../model/Post.js";
import statusCodes from "../../../globals/statusCodes.js";

setupTestDatabase();

describe(`Given the DELETE /posts/${macAndCheeseDocumentDto._id} endpoint`, () => {
  describe("When it receives a request with Mac & Cheese recipe's ID", () => {
    test("Then it should respond with Mac & Cheese recipe and it should no longer exist", async () => {
      const postId = macAndCheeseDocumentDto._id;

      const response = await request(app).delete(`/posts/${postId}`);
      const matchingPost = await Post.findOne({
        _id: macAndCheeseDocumentDto._id,
      });

      const { post } = response.body as PostResponse;

      expect(post).toStrictEqual(macAndCheeseDocumentDto);
      expect(matchingPost).toBeNull();
    });
  });
});

describe(`Given the DELETE /posts/${oatsWithBerriesDocumentDto._id} endpoint`, () => {
  describe("When it receives a request with Oats with Berries recipe's ID which doesn't exist", () => {
    test(`Then it should respond with error 404 'Post with ID ${oatsWithBerriesDocumentDto._id} doesn't exist'`, async () => {
      const response = await request(app).delete(
        `/posts/${oatsWithBerriesDocumentDto._id}`,
      );

      const { error } = response.body as ErrorRespone;

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(error).toBe(
        `Post with ID ${oatsWithBerriesDocumentDto._id} doesn't exist`,
      );
    });
  });
});

describe("Given the DELETE /posts/1234 endpoint", () => {
  describe("When it receives a request with '1234' invalid object ID", () => {
    test("Then it should respond with error 400 'Invalid post ID'", async () => {
      const response = await request(app).delete("/posts/1234");

      const { error } = response.body as ErrorRespone;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe("Invalid post ID");
    });
  });
});
