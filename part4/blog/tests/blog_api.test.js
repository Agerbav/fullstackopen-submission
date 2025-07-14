const assert = require('node:assert')
const { test, after, beforeEach, expect } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog id are properly named id', async () => {
  const response = await api.get('/api/blogs')
  for(const blog of response.body){
    assert(blog.hasOwnProperty('id') && !blog.hasOwnProperty('_id'))
  } 
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    "title": "async/await simplifies making async calls",
    "author": "testtest",
    "url": "randomurl.com",
    "likes": 0,
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  // console.log(blogsAtEnd);
  
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('blog with no likes propery, default to 0 ', async () => {
  const newBlog = {
    "title": "this blog doesnt have likes properties",
    "author": "testtest",
    "url": "randomurl.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert(blogsAtEnd[blogsAtEnd.length-1].likes === 0)
})

test('blog with no title or url property, returns 400 bad request', async () => {
  const newBlog = {
    "author": "testtest",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog deleted with status 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(b => b.title)
  assert(!contents.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('update blog post likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0] 
  const newLikes = {likes: 1234321}

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newLikes).expect(200)

  const blogsAtEnd = await helper.blogsInDb() 
  const updatedBlog = blogsAtEnd[0]

  assert.strictEqual(updatedBlog.likes, newLikes.likes)
})

after(async () => {
  await mongoose.connection.close()
})