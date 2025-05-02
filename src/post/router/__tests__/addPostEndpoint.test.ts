import request from "supertest";
import app from "../../../server/app.js";
import { PostResponse, ErrorRespone } from "../../controller/types.js";
import { macAndCheeseDto, oatsWithBerriesDto } from "../../dto/fixtures.js";
import setupTestDatabase from "../../../test-utils/setupTestDatabase.js";
import statusCodes from "../../../globals/statusCodes.js";

setupTestDatabase();

describe("Given the POST /posts endpoint", () => {
  describe("When it receives a request with Oats with Berries recipe", () => {
    test("Then it should respond with Oats with Berries recipe", async () => {
      const response = await request(app)
        .post("/posts")
        .send(oatsWithBerriesDto);

      const { post } = response.body as PostResponse;

      expect(post).toEqual(expect.objectContaining(oatsWithBerriesDto));
    });
  });

  describe("When it receives a request with Mac & Cheese recipe which already exists", () => {
    test("Then it should respond with error 409 'Post with this title already exists'", async () => {
      const response = await request(app).post("/posts").send(macAndCheeseDto);

      const { error } = response.body as ErrorRespone;

      expect(response.status).toBe(statusCodes.CONFLICT);
      expect(error).toBe("Post with this title already exists");
    });
  });

  describe("When it receives a request with Oats with Berries recipe by author 'A'", () => {
    test("Then it should respond with error 400 'Post validation failed: author: Minimum 2 characters required'", async () => {
      const post = { ...oatsWithBerriesDto, author: "A" };

      const response = await request(app).post("/posts").send(post);

      const { error } = response.body as ErrorRespone;

      expect(response.status).toBe(statusCodes.BAD_REQUEST);
      expect(error).toBe(
        "Post validation failed: author: Minimum 2 characters required",
      );
    });
  });

  describe("When it receives a request with Oats with Berries recipe without publish date", () => {
    test("Then it should respond with Oats with Berries recipe that was published today", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { publishDate, ...oatsWithBerriesWithoutPublishDate } =
        oatsWithBerriesDto;

      const response = await request(app)
        .post("/posts")
        .send(oatsWithBerriesWithoutPublishDate);

      const { post } = response.body as PostResponse;

      const postPublishDate = new Date(post.publishDate).toDateString();
      const currentDate = new Date().toDateString();

      expect(postPublishDate).toBe(currentDate);
    });
  });
});
