import { useNavigate, useParams } from 'react-router';

import { useUser } from '../hooks/useUser';
import { useBlogs } from '../hooks/useBlogs';
import { useBlogById } from '../hooks/useBlogById';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useUser();
  const { blog } = useBlogById(id);
  const { likeBlog, deleteBlog } = useBlogs();

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };

    likeBlog({ id: blog.id, updatedBlog });
  };

  const removeBlog = () => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

    if (ok) {
      deleteBlog(blog.id);
      navigate('/');
    }
  };

  if (!blog) {
    return <div>blog not found</div>;
  }

  const showDeleteButton = blog?.user?.username === user.username;

  return (
    <div>
      <h2>{blog.title}</h2>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>

      <div>
        {blog.likes} likes <button onClick={updateLikes}>like</button>
      </div>

      <div>added by {blog.user?.username || 'anonymous'}</div>

      {showDeleteButton && (
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
