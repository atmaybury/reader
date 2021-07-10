const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const subsRouter = require('./controllers/subs')
const usersRouter = require('./controllers/users')

// connect to mongoose db
const url = config.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to reader-backend db')
  })
  .catch(error => {
    console.log('Error connecting to reader-backend db', error.message)
  })

// middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
//app.use(express.static('build'))

// routes
app.use('/api/login', loginRouter)
app.use('/api/subs', subsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
