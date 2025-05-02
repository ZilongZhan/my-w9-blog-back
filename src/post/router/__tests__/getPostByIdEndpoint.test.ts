import request from "supertest";
import app from "../../../server/app.js";
import {
  macAndCheeseDocumentDto,
  oatsWithBerriesDocumentDto,
} from "../../dto/fixtures.js";
import { ErrorRespone, PostResponse } from "../../controller/types.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import statusCodes from "../../../globals/statusCodes.js";

setupTestDatabase();

describe("Given the GET /posts/:postId endpoint", () => {
  describe("When it receives a request with Mac & Cheese recipe's ID", () => {
    test("Then it should respond with Mac & Cheese recipe", async () => {
      const response = await request(app).get(
        `/posts/${macAndCheeseDocumentDto._id}`,
      );

      const { post } = response.body as PostResponse;

      expect(post).toStrictEqual(macAndCheeseDocumentDto);
    });
  });

  describe("When it receives a request with Oats with Berries recipe's ID which doesn't exist", () => {
    test(`Then it should respond with error 404 'Post with ID ${
      oatsWithBerriesDocumentDto._id
    } doesn't exist'`, async () => {
      const expectedErrorMessage = `Post with ID ${oatsWithBerriesDocumentDto._id} doesn't exist`;

      const response = await request(app).get(
        `/posts/${oatsWithBerriesDocumentDto._id}`,
      );

      const { error } = response.body as ErrorRespone;

      expect(response.status).toBe(statusCodes.NOT_FOUND);
      expect(error).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with '1234' invalid object ID", () => {
    test("Then it should respond with error 400 'Invalid post ID'", async () => {
      const expectedErrorMessage = "Invalid post ID";

      const response = await request(app).get("/posts/1234");

      const { error } = response.body as ErrorRespone;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe(expectedErrorMessage);
    });
  });
});
