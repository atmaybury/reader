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
    console.log(decodedToken)
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

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint
}
