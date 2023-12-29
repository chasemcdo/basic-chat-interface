import app from "../app";
import request from "supertest";

describe("Test health path", () => {
  test("GET method returns 200", () => {
    return request(app).get("/health").expect(200);
  });
});
