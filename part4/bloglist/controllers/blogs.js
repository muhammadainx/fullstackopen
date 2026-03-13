const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");

const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { user } = request;
  const { title, author, url, likes = 0 } = request.body;

  if (!title || !author || !url) {
    return response.status(400).json({
      error: "Missing required fields: title, author, and url are required",
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  await savedBlog.populate("user", { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const blogToUpdate = { title, author, url, likes, user };

  const opt = {
    returnDocument: "after",
    runValidators: true,
    context: "query",
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToUpdate,
    opt,
  ).populate("user", { username: 1, name: 1 });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    return response.status(404).end();
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  if (blog.user.toString() !== request.user.id) {
    return response.status(403).json({ error: "forbidden" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
