const subsRouter = require('express').Router()
//const axios = require('axios')
//const convert = require('xml-js')
const Parser = require('rss-parser')
//const parseFeed = require('./../utils/feedParser')
const Sub = require('../models/subscription')

/* SET TO /api/subs */

const parser = new Parser()

// get all subscriptions
subsRouter.get('/', async (req, res) => {
  const subs = await Sub.find({})
  res.json(subs)
})

// get rss feed from subscription source
subsRouter.get('/*', async (req, res) => {
  const url = req.params[0]
  const feed = await parser.parseURL(url)
  //const response = await axios.get(url)
  //const responseJs = convert.xml2js(response.data, { compact: true, spaces: 4 })
  //const parsedFeed = parseFeed(responseJs.rss.channel.item)
  res.json(feed.items)
})

// add subscription
subsRouter.post('/', async (req, res) => {
  const feed = await parser.parseURL(req.body.url) 

  const sub = new Sub({
    url: feed.feedUrl || req.body.url,
    name: feed.title
  })

  const savedSub = await sub.save()
  res.status(200).json(savedSub)
})

// delete subscription
subsRouter.delete('/:id', async (req, res) => {
  const sub = Sub.findById(req.params.id)
  if (sub) {
    await Sub.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  } else {
    return res.status(404).end()
  }
})

module.exports = subsRouter
