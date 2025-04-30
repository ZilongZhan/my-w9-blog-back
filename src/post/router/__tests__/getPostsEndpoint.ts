import request from "supertest";
import app from "../../../server/app.js";
import { PostStructure } from "../../types.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";

setupTestDatabase();

describe("Given the GET /posts endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with Mac & Cheese and Pulled Pork recipes and 2", async () => {
      const expectedPostTitle1 = "Instant Pot Mac and Cheese";
      const expectedPostTitle2 = "Slow Cooker BBQ Pulled Pork";

      const response = await request(app).get("/posts");

      const { posts, postsTotal } = (await response.body) as {
        posts: PostStructure[];
        postsTotal: number;
      };

      expect(posts).toContainEqual(
        expect.objectContaining({ title: expectedPostTitle1 }),
      );
      expect(posts).toContainEqual(
        expect.objectContaining({ title: expectedPostTitle2 }),
      );
      expect(postsTotal).toBe(2);
    });
  });
});
