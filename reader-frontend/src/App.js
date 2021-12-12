import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { checkLoggedInUser } from './reducers/loginReducer'
import LoginRegisterPanel from './components/LoginRegisterPanel'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ContentPanel from './components/ContentPanel'
import './App.css'

const App = () => {

  // redux states
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.loggedInUser)

  // on page load
  useEffect(() => {
    dispatch(checkLoggedInUser())
  }, [dispatch])

  if (!user) {
    return(
      <LoginRegisterPanel />
    )
  }
  
  return (
    <div>
      <Header />
      <Main>
        <SideBar />
        <ContentPanel />
      </Main>
    </div>
    )
}

const Main = styled.div`
  width: 100%;
  display: flex;
`

export default App;
