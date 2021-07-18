const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Sub = require('../models/subscription')
//const helper = require('./users.test.helper')

const api = supertest(app)

const baseUrl = '/api/subs'

describe('when db contains 1 test user', () => {

  beforeEach(async () => {
    await Sub.deleteMany({})
    console.log('cleared db')
  })

  test('subs are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // sub post success with working URL
  // sub post error 400 on bad URL
  // sub post error 400 on no user

  // get feed success with working URL
  // get feed only gets subs for current user
  // get feed error 400 on bad URL
  // get feed error 400 on no user

  // delete success with valid post
  // delete error 400 with invalid post
  // delete error 400 with no user
  // delete error 400 with wrong user
})

afterAll(() => {
  mongoose.connection.close()
})
