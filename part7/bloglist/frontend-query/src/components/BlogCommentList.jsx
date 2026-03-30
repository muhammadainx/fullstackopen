const BlogCommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </ul>
  );
};

export default BlogCommentList;
