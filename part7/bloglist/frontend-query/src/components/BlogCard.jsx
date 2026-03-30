import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from '@mui/material';

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
    <Card sx={{ mb: 2, maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1 }}>
          <Link href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography>{blog.likes} likes</Typography>
          <Button size="small" variant="contained" onClick={updateLikes}>
            like
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          added by {blog.user?.username || 'anonymous'}
        </Typography>
      </CardContent>

      {showDeleteButton && (
        <CardActions>
          <Button variant="outlined" color="error" onClick={removeBlog}>
            remove
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default BlogCard;
