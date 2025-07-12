const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog=>blog.likes)
  const reducer = (sum, like) => sum + like

  return likes.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((prev, current) => {
    return (prev && prev.likes > current.likes) ? prev : current
  }, 0)
  return blogs.length === 0
    ? undefined
    : mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}