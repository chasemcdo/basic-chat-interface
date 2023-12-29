import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import env from "../utils/env";

beforeAll(() => {
  mongoose.connect(env.MONGODB_URI);
});

afterAll(() => {
  mongoose.disconnect();
});

describe("Test messaging endpoints", () => {
  test("GET method returns 200", () => {
    return request(app).get("/users/msg").expect(200);
  });
});
