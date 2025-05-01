import request from "supertest";
import app from "../../../server/app.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import { GetPostsInfoResponse } from "../../controller/types.js";
import { macAndCheeseDto, pulledPorkDto } from "../../dto/fixtures.js";

setupTestDatabase();

describe("Given the GET /posts endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with Mac & Cheese and Pulled Pork recipes and 2", async () => {
      const expectedPostsTotal = 2;

      const response = await request(app).get("/posts");

      const { posts, postsTotal } = response.body as GetPostsInfoResponse;

      expect(posts).toContainEqual(
        expect.objectContaining({ title: macAndCheeseDto.title }),
      );
      expect(posts).toContainEqual(
        expect.objectContaining({ title: pulledPorkDto.title }),
      );
      expect(postsTotal).toBe(expectedPostsTotal);
    });
  });
});
