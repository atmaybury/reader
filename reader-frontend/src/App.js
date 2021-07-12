import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoggedInUser, logout } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import SideBar from './components/SideBar'
import ContentPanel from './components/ContentPanel'
import './App.css'

const App = () => {

  // redux states
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // on page load
  useEffect(() => {
    dispatch(checkLoggedInUser())
    document.body.style.backgroundColor = 'antiquewhite'
  }, [dispatch])

  if (!user) {
    return(
      <LoginForm />
    )
  }

  return (
    <div>
      Logged in as {user.name} 
      <button onClick={() => dispatch(logout())}>logout</button>
      <div className='main'>
        <SideBar />
        <ContentPanel />
      </div>
    </div>
    )
}

export default App;
