const Blog = require('../models/blog')
const User = require('../models/user')

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
const initialUser = [
  {
    "username": "root",
    "name": "admin",
    "passwordHash": "admin123"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  blogsInDb,
  usersInDb
}