const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");

const app = require("../app");
const helper = require("./test_helper");

const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("rootpwd", 10);
  const user = new User({ username: "root", name: "Root Smith", passwordHash });

  await user.save();
});

describe("addition of a new user", () => {
  test("should succeed with valid data", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "john",
      name: "John Smith",
      password: "johnpwd",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("should return 400 if username already exists", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Super Smith",
      password: "superpwd",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(result.body.error.includes("expected `username` to be unique"));

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("should return 400 if username is less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "js",
      name: "John Smith",
      password: "jspwd",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    assert(
      result.body.error.includes("username must be at least 3 characters long"),
    );

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("should return 400 if password is less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "johns",
      name: "John Smith",
      password: "js",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    assert(
      result.body.error.includes("password must be at least 3 characters long"),
    );

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("should return 400 if username is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "John Smith",
      password: "johnpwd",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    assert(result.body.error.includes("username is required"));

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("should return 400 if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "johns",
      name: "John Smith",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    assert(result.body.error.includes("password is required"));

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
