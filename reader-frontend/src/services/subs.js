import axios from 'axios'
import store from '../store'

const baseUrl = '/api/subs'

const getToken = async () => {
  const state = store.getState()
  return `bearer ${state.user.token}`
}

const getAll = async () => {
  const token = await getToken()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const subscribe = async url => {
  const token = await getToken()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, { url: url }, config)
  return response.data
}

const unsubscribe = async id => {
  const token = await getToken()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getFeed = async url => {
  const token = await getToken()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}/${url}`, config)
  return response.data
}

export default { getAll, subscribe, unsubscribe, getFeed }
