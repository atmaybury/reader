const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('./../models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.decode(req.token, config.JWT_SECRET)
    if (!decodedToken.id) {
      return response.status('401').json({ error: 'token missing or invalid' })
    }
    // TODO error check for user not found by id?
    req.user = await User.findById(decodedToken.id)
  }
  next()
}
 const unknownEndpoint = (req, res) => {
   res.status(404).json({ error: 'unknown endpoint' })
 }

const errorHandler = (err, req, res, next) => {
  console.log(err.name)
  if (err.code === 'ECONNREFUSED') {
    return res.status(404).json({ error: 'connection refused, possibly bad URL' })
  } else if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
