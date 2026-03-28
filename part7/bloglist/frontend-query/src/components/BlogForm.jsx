import { useState } from 'react';

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
      <div>
        <label>
          Title:{' '}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author:{' '}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Url:{' '}
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
