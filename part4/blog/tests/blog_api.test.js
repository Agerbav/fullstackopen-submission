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
  assert.strictEqual(response.body[0].hasOwnProperty('id') && response.body[0].hasOwnProperty('_id') === false, true)
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

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('async/await simplifies making async calls'))
})

after(async () => {
  await mongoose.connection.close()
})