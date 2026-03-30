import { useNavigate } from 'react-router';

import { useBlogs } from '../hooks/useBlogs';
import { useUser } from '../hooks/useUser';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const { user } = useUser();
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

  const showDeleteButton = blog?.user?.username === user.username;

  return (
    <article>
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
    </article>
  );
};

export default BlogCard;
