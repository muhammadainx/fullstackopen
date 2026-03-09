const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const { title, author, url, likes = 0 } = request.body;

  if (!title || !author || !url) {
    return response.status(400).json({
      error: "Missing required fields: title, author, and url are required",
    });
  }

  const blog = new Blog({ title, author, url, likes });

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
