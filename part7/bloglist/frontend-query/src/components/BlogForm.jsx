import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';

import { useBlogs } from '../hooks/useBlogs';

const BlogForm = ({ onBlogCreated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { createBlog } = useBlogs();

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog(
      { title, author, url },
      {
        onSuccess: () => {
          setTitle('');
          setAuthor('');
          setUrl('');

          onBlogCreated?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ width: 300 }}>
        <TextField
          label="Title"
          size="small"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="Author"
          size="small"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="Url"
          size="small"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </Stack>
    </form>
  );
};

export default BlogForm;
