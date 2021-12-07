import subsService from './../services/subs'

const initialState = {
  currentSub: null,
  subs: [],
  errors: null
}

export const initSubs = () => {
  return async dispatch => {
    const subs = await subsService.getAll()
    dispatch({
      type: 'INIT_SUBS',
      data: subs
    })
  }
}

export const addNewSub = url => {
  return async dispatch => {
    try {
      const response = await subsService.subscribe(url)
      dispatch({
        type: 'NEW_SUB',
        data: response
      })
      dispatch(newFeed(response))
    } catch (e) {
      console.error(e)
      dispatch(addSubError(e.message))
    }
  }
}

export const removeSub = id => {
  return async dispatch => {
    await subsService.unsubscribe(id)
    dispatch({
      type: 'REMOVE_SUB',
      data: id
    })
    dispatch(setCurrentSub(null))
  }
}

export const setCurrentSub = sub => {
  return {
    type: 'SET_SUB',
    data: sub
  }
}

export const newFeed = sub => {
  return async dispatch => {
    console.log('getting feed from', sub.name)
    try {
      const feed = await subsService.getFeed(sub.url)
      const updatedSub = { ...sub, feed: feed }
      dispatch({
        type: 'ADD_FEED',
        sub: updatedSub
      })
      dispatch(setCurrentSub(updatedSub))
    } catch (e) {
      console.log(e)
      dispatch(addSubError(e.message))
    }
  }
}

export const addSubError = error => ({
  type: 'ADD_ERROR',
  error: error
})

export const removeSubError = () => ({
  type: 'REMOVE_ERROR'
})

const subReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INIT_SUBS':
      return { ...state, subs: action.data }
    case 'NEW_SUB':
      return { ...state, subs: [ ...state.subs, action.data ] }
    case 'REMOVE_SUB':
      return { ...state, subs: state.subs.filter(s => s.id !== action.data) }
    case 'SET_SUB':
      return { ...state, currentSub: action.data }
    case 'ADD_FEED':
      return { ...state, subs: state.subs.map(s => s.id === action.sub.id ? action.sub : s) }
    case 'ADD_ERROR':
      return { ...state, error: action.error }
    case 'REMOVE_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

export default subReducer
