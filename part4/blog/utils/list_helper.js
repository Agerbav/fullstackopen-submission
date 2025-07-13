const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
  const result = lodash.countBy(blogs, 'author')
  const topAuthor = lodash.maxBy(lodash.toPairs(result), lodash.last)
  // console.log(topAuthor)

  return blogs.length === 0
    ? undefined
    : {
      author: topAuthor[0],
      blogs: topAuthor[1]
    }
}

const mostLiked = (blogs) => {
  const result = lodash(blogs)
    .groupBy('author')
    .map((userBlogs, author) => ({
      author: author,
      likes: lodash.sumBy(userBlogs, 'likes')
    }))
    .maxBy('likes')
  // console.log(result)
  return blogs.length === 0
    ? undefined
    : result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLiked
}
