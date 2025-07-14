const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUser)
})

describe('When a user exists in database', () => {
  test('Username not unique', async () => {
    const user = {
      "username": "root",
      "name": "randomname",
      "password": "randompassword"
    } 

    await api
      .post('/api/users')
      .send(user)
      .expect(500)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUser.length)
  })

  describe('Username is atleast 3 characters', () => {
    test('Username is less than 3', async () => {
      const user = {
        "username": "ro",
        "name": "randomname",
        "password": "randompassword"
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUser.length)
    })

    test('Username is greater than 3', async () => {
      const user = {
        "username": "rowling",
        "name": "randomname",
        "password": "randompassword"
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUser.length + 1)
    })
  })

  describe('Password is atleast 3 characters', () => {
    test('Password is less than 3', async () => {
      const user = {
        "username": "rowling",
        "name": "randomname",
        "password": "ra"
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUser.length)
    })
    test('Password is greater than 3', async () => {
      const user = {
        "username": "rowling",
        "name": "randomname",
        "password": "randompassword"
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUser.length + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})