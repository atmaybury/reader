import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import subReducer from './reducers/subReducer'
//import feedReducer from './reducers/feedReducer'

const reducer = combineReducers({
  user: loginReducer,
  //feeds: feedReducer,
  subs: subReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store
