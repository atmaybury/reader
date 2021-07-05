import axios from 'axios'
const baseUrl = '/api/subs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const subscribe = async url => {
  const response = await axios.post(baseUrl, { url: url })
  return response.data
}

const unsubscribe = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const getFeed = async url => {
  const response = await axios.get(`${baseUrl}/${url}`)
  return response.data.rss.channel.item
}

export default { getAll, subscribe, unsubscribe, getFeed }
