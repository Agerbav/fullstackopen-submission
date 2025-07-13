const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "How to win friends and influence people",
    "author": "Dale Carniege",
    "url": "randomurl.com",
    "likes": 999,
  },
  {
    "title": "The psychology of Money",
    "author": "Morgan Housel",
    "url": "randomurl.com",
    "likes": 0,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}