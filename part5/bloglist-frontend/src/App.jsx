import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      notify(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
        "success",
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      notify(errorMessage, "error");
    }
  };

  const updateLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
    } catch {
      notify("Failed to update like count", "error");
    }
  };

  const removeBlog = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

    if (ok) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        notify("Blog deleted successfully", "success");
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "Something went wrong";
        notify(errorMessage, "error");
      }
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

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLikes={updateLikes}
              removeBlog={removeBlog}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
