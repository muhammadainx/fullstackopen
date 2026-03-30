import { useParams } from 'react-router';

import BlogCard from '../components/BlogCard';
import BlogCommentForm from '../components/BlogCommentForm';
import BlogCommentList from '../components/BlogCommentList';

import { useBlogById } from '../hooks/useBlogById';

const Blog = () => {
  const { id } = useParams();

  const { blog } = useBlogById(id);

  if (!blog) {
    return <div>blog not found</div>;
  }

  return (
    <main>
      <BlogCard blog={blog} />
      <h3>comments</h3>
      <BlogCommentForm blogId={blog.id} />
      <BlogCommentList comments={blog.comments} />
    </main>
  );
};

export default Blog;
