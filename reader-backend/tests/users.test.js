const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./users.test.helper')

const api = supertest(app)

const baseUrl = '/api/users'
const password = 'tester123'
const createPasswordHash = async () => await bcrypt.hash(password, 10)
const newUser = {
  username: 'tester',
  name: 'tester'
}

const createUser = async () => {
  const passwordHash = await createPasswordHash()
  const testUser = new User({ ...newUser, passwordHash })
  await testUser.save()
}

describe('when db contains 1 test user', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    console.log('cleared db')
    await createUser()
  })

  test('users are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('test user is in test db', async () => {
    const users = await User.find({})
    expect(users).toHaveLength(1)
    expect(users[0].name).toBe('tester')
  })
})

describe('creating a new user via post', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('succeeds', async () => {
    const usersAtStart = await helper.usersInDb()
    await api
      .post(baseUrl)
      .send({ ...newUser, password: password })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('returns error 400 if username is missing', async () => {
    await api
      .post(baseUrl)
      .send({ ...newUser, username: '', password: password })
      .expect(400)
  })

  test('returns error 400 if username length < 3', async () => {
    await api
      .post(baseUrl)
      .send({ ...newUser, username: 'ab', password: password })
      .expect(400)
  })

  test('returns error 400 if password is missing', async () => {
    await api
      .post(baseUrl)
      .send(newUser)
      .expect(400)
  })

  test('returns error 400 if password length < 8', async () => {
    await api
      .post(baseUrl)
      .send({ ...newUser, password: 'short' })
      .expect(400)
  })

  test('returns error 400 if name is missing', async () => {
    await api
      .post(baseUrl)
      .send({ ...newUser, name: '', password: password })
      .expect(400)
  })

  test('returns error 400 if username is taken', async () => {
    await createUser()
    await api
      .post(baseUrl)
      .send({ ...newUser, password: password })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
