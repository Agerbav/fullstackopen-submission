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

module.exports = {
  dummy,
  totalLikes
}