import { useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { useUser } from './hooks/useUser';
import { useBlogs } from './hooks/useBlogs';

const App = () => {
  const { user, logoutUser } = useUser();
  const { blogs, isLoading, isError, likeBlog, deleteBlog } = useBlogs();

  const blogFormRef = useRef();

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const handleBlogCreated = () => {
    blogFormRef.current.toggleVisibility();
  };

  const updateLikes = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };

    likeBlog({ id: blog.id, updatedBlog });
  };

  const removeBlog = (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

    if (ok) {
      deleteBlog(blog.id);
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />

      {!user && (
        <>
          <h2>Log in to application</h2>
          <LoginForm />
        </>
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={logoutUser}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onBlogCreated={handleBlogCreated} />
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
