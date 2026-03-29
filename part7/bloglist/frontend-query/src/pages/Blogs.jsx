import { useRef } from 'react';
import { Link } from 'react-router';

import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';

import { useBlogs } from '../hooks/useBlogs';

const Blogs = () => {
  const { blogs, isLoading, isError } = useBlogs();

  const blogFormRef = useRef();

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          onBlogCreated={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <div style={{ marginTop: 16 }}>
        {sortedBlogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
