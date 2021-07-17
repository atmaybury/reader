import loginService from '../services/login'

export const setLoggedInUser = user => {
  return {
      type: 'STORE_USER',
      data: user
  }
}

export const login = credentials => {
  return async dispatch => {
    const loggedInUser = await loginService.login(credentials)
    window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    dispatch(setLoggedInUser(loggedInUser))
  }
}

export const logout = () => {
  return async dispatch => {
    console.log('logging out')
    window.localStorage.removeItem('loggedInUser')
    dispatch(setLoggedInUser(null))
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
