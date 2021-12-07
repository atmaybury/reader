const bcrypt = require('bcrypt')
const User = require('./../models/user')
const usersRouter = require('express').Router()

/* SET TO /api/users */

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const userById = await User.findById(req.params.id)
  if (userById) {
    return res.json(userById)
  } else {
    return res.status(404).json({ error: 'user not found' })
  }
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.username || !body.name || !body.password) {
    return res.status(400).json({ error: 'username, name and password are required' })
  }
  if (body.username.length < 3) {
    return res.status(400).json({ error: 'username must be at least 3 digits long' })
  }
  if (body.password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 digits long' })
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
