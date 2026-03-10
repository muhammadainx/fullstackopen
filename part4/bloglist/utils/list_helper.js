const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const reducer = (favorite, current) => {
    return favorite.likes > current.likes ? favorite : current;
  };

  return blogs.reduce(reducer);
};

const findAuthorWithMostBlogs = (countByAuthor) => {
  return Object.keys(countByAuthor).reduce((topAuthor, author) =>
    countByAuthor[author] > countByAuthor[topAuthor] ? author : topAuthor,
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const countByAuthor = _.countBy(blogs, "author");
  const authorWithMostBlogs = findAuthorWithMostBlogs(countByAuthor);

  return {
    author: authorWithMostBlogs,
    blogs: countByAuthor[authorWithMostBlogs],
  };
};

const countTotalLikesForAuthors = (authorsWithBlogs) => {
  return Object.entries(authorsWithBlogs).map(([author, authorBlogs]) => {
    const totalLikes = authorBlogs.reduce(
      (total, authorBlog) => total + authorBlog.likes,
      0,
    );

    return { author, likes: totalLikes };
  });
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorsWithBlogs = _.groupBy(blogs, "author");
  const authorWithTotalLikes = countTotalLikesForAuthors(authorsWithBlogs);

  return authorWithTotalLikes.reduce((mostLikes, current) =>
    current.likes > mostLikes.likes ? current : mostLikes,
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
