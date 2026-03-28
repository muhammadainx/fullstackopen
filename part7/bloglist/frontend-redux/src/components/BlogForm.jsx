import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ toggleFormVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await dispatch(createBlog({ title, author, url }));

      setTitle("");
      setAuthor("");
      setUrl("");

      toggleFormVisibility?.();

      dispatch(
        setNotification({
          message: `A new blog "${newBlog.title}" by ${newBlog.author} added!`,
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response?.data?.error || "Something went wrong",
          status: "error",
        }),
      );
    }
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author:{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Url:{" "}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
