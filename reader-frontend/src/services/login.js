import axios from 'axios'
import store from '../store'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const { data } = await axios.post(baseUrl, credentials)
    return data
  } catch(e) {
    throw new Error(e.response.data.error)
  }
}

export default { login }
