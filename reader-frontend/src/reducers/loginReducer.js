import loginService from '../services/login'

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
      dispatch(setLoggedInUser(loggedInUser))
    } catch (err) {
      console.log(err)
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
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const loggedInUserJSON = JSON.parse(loggedInUser)
      dispatch(setLoggedInUser(loggedInUserJSON)) 
    }
  }
}

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'STORE_USER':
      return action.data
    default:
      return state
  }
}

export default loginReducer
