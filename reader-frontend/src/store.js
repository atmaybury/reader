import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import subReducer from './reducers/subReducer'

const reducer = combineReducers({
  user: loginReducer,
  subs: subReducer
})

const rootReducer = (state, action) => {
  console.log(state)
  switch(action.type) {
    case 'USER_LOGOUT':
      return reducer(undefined, action)
    default:
      return reducer(state, action)
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store
