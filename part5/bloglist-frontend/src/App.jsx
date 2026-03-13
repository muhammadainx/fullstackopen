import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const notify = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch {
      notify("invalid username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      notify(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
        "success",
      );
    } catch (error) {
      const backendResponse = error.response?.data?.error;
      notify(
        backendResponse ? `Error: ${backendResponse}` : "Something went wrong",
        "error",
      );
    }
  };

  return (
    <div>
      <Notification notification={notification} />

      {!user && (
        <>
          <h2>Log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </>
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>

          <BlogForm createBlog={createBlog} />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
