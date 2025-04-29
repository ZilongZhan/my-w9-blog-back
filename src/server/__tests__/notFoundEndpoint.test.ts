import request from "supertest";
import app from "../app.js";

describe("Given a /test non existent endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with error 404 'Endpoint not found'", async () => {
      const response = await request(app).get("/test");
      const newLocal = "Endpoint not found";

      const { error } = (await response.body) as { error: string };

      expect(response.status).toBe(404);
      expect(error).toBe(newLocal);
    });
  });
});
