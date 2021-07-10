const bcrypt = require('bcrypt')
const User = require('./../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username and password are both required' })
  }
  if (body.password.length < 8) {
    return response.status(400).json({ error: 'password must be at least 8 digits long' })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter
