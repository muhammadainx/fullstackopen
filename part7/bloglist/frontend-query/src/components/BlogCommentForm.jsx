import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button>add comment</button>
    </form>
  );
};

export default BlogCommentForm;
