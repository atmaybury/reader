const subsRouter = require('express').Router()
const Parser = require('rss-parser')
const Sub = require('../models/subscription')

/* SET TO /api/subs */

const parser = new Parser()

// get all subscriptions
subsRouter.get('/', async (req, res) => {
  const user = req.user
  const userSubs = await Sub.find({ user: user._id })
  res.json(userSubs)
})

// get rss feed from subscription source
subsRouter.get('/*', async (req, res) => {
  const url = req.params[0]
  const feed = await parser.parseURL(url)
  res.json(feed.items)
})

// add subscription
subsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'missing user auth token' })
  }
  if (!body.url) {
    return res.status(401).json({ error: 'missing url' })
  }

  const feed = await parser.parseURL(body.url) 

  const sub = new Sub({
    url: feed.feedUrl || body.url,
    name: feed.title,
    user: user._id
  })
  const savedSub = await sub.save()

  user.subs = user.subs.concat(savedSub._id)
  await user.save()

  res.status(200).json(savedSub)
})

// delete subscription
subsRouter.delete('/:id', async (req, res) => {
  const user = req.user
  const sub = await Sub.findById(req.params.id)

  if (!sub) {
    return res.status(404).json({ error: 'subscription not found' })
  }
  if (user._id.toString() !== sub.user.toString()) {
    return res.status(403).json({ error: 'user id does not match subscriber id' })
  }

  await Sub.findByIdAndRemove(req.params.id)
  user.subs = user.subs.filter(s => s.toString() !== sub._id.toString())
  await user.save()
  return res.status(204).end()
})

module.exports = subsRouter
