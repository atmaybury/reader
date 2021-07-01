import axios from 'axios'
const baseUrl = '/api/subs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const subscribe = async url => {
  const response = axios.post(baseUrl, url)
  return response.data
}

const getFeed = async url => {
  const response = await axios.get(`${baseUrl}/${url}`)
  return  response.data.rss.channel.item
}
//TODO
// axios call to get feed for single sub

export default { getAll, subscribe, getFeed }
