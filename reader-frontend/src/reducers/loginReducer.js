import loginService from '../services/login'
import store from '../store'

export const setLoggedInUser = user => {
  return {
      type: 'STORE_USER',
      data: user
  }
}

export const login = credentials => {
  return async dispatch => {
    try {
      const loggedInUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      dispatch(setLoggedInUser({ loggedInUser: loggedInUser, error: null }))
    } catch (e) {
      console.error(e.message)
      dispatch(setLoggedInUser({ loggedInUser: null, error: e.message }))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({ type: 'USER_LOGOUT', action: null })
  }
}

export const checkLoggedInUser = () => {
  return async dispatch => {
    try {
      const loggedInUser = window.localStorage.getItem('loggedInUser')
      if (loggedInUser) {
        const loggedInUserJSON = JSON.parse(loggedInUser)
        dispatch(setLoggedInUser({ loggedInUser: loggedInUserJSON, error: null }))
      }
    } catch (e) {
      console.error(e)
      dispatch(setLoggedInUser({ loggedInUser: null, error: e.message }))
    }
  }
}

export const clearLoginError = () => ({
  type: 'CLEAR_ERROR'
})

const loginReducer = (state = { user: null, error: null }, action) => {
  switch(action.type) {
    case 'STORE_USER':
      return action.data
    case 'CLEAR_ERROR':
      return { ...store, error: null }
    default:
      return state
  }
}

export default loginReducer
