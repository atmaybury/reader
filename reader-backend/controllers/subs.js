const subsRouter = require('express').Router()
const Sub = require('../models/subscription')
const axios = require('axios')
const convert = require('xml-js')

/* SET TO /api/subs */

// get all subscriptions
subsRouter.get('/', async (req, res) => {
  const subs = await Sub.find({})
  res.json(subs)
})

// get rss feed from subscription source
subsRouter.get('/*', async (req, res) => {
  const url = req.params[0]
  const response = await axios.get(url)
  const jsResponse = convert.xml2js(response.data, { compact: true, spaces: 4 })
  res.json(jsResponse)
})

// add subscription
subsRouter.post('/', async (req, res) => {
  console.log(req.body)
  const response = await axios.get(req.body.url)
  const responseJs = convert.xml2js(response.data, { compact: true, spaces: 4 })
  const sub = new Sub({
    url: req.body.url,
    name: responseJs.rss.channel.title._text
  })
  const savedSub = await sub.save()
  res.status(200).json(savedSub)
})

// delete subscription
subsRouter.delete('/:id', async (req, res) => {
  const sub = Sub.findById(req.params.id)
  if (sub) {
    await Sub.findOneAndRemove(req.params.id)
    return res.status(204).end()
  } else {
    return res.status(404).end()
  }
})

module.exports = subsRouter
