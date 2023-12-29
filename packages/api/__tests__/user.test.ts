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

  test("POST method with message returns 200", () => {
    const payload = {
      message: "Hello World",
    };
    return request(app).post("/users/msg").send(payload).expect(200);
  });

  test("POST method without message returns 400", () => {
    return request(app).post("/users/msg").expect(400);
  });

  test("DELETE method returns 200", () => {
    return request(app).delete("/users/msg").expect(200);
  });
});
