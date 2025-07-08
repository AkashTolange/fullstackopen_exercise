const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

test('valid user is created', async () => {
  const newUser = {
    username: 'akash',
    name: 'Akash Tolange',
    password: 'password123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('username too short', async () => {
  const newUser = {
    username: 'ab',
    password: 'validpass'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('is shorter than the minimum')
})
