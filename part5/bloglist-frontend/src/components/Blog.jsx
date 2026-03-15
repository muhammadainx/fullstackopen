import { useState } from "react";

const Blog = ({ blog, user, updateLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{label}</button>
      </div>

      {showDetails && (
        <>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {showDeleteButton && (
            <div>
              <button onClick={() => removeBlog(blog)}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
