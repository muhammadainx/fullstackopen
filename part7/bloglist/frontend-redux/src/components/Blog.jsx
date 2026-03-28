import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  };

  const label = showDetails ? "hide" : "view";

  const showDeleteButton = blog.user?.username === user.username;

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog));
    } catch {
      dispatch(
        setNotification({
          message: "Failed to update like count",
          status: "error",
        }),
      );
    }
  };

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

    if (ok) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(
          setNotification({
            message: "Blog deleted successfully",
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
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>{label}</button>
      </div>

      {showDetails && (
        <>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {showDeleteButton && (
            <div>
              <button onClick={handleRemove}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
