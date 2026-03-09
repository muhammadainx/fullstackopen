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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
