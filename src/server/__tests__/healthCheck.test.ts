import request from "supertest";
import app from "../app.js";

describe("Given the GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status code 200 and a 'OK' message", async () => {
      const expectedMessage = "OK";
      const expectedStatusCode = 200;

      const response = await request(app).get("/");

      const { message } = (await response.body) as { message: string };

      expect(message).toBe(expectedMessage);
      expect(response.status).toBe(expectedStatusCode);
    });
  });
});
