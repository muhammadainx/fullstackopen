import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { useBlogs } from '../hooks/useBlogs';

const BlogCommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');

  const { addComment } = useBlogs();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    addComment({ id: blogId, comment });
    setComment('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
    >
      <TextField
        size="small"
        sx={{ flexGrow: 1 }}
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button variant="contained">add comment</Button>
    </Box>
  );
};

export default BlogCommentForm;
