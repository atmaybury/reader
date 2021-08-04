import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { checkLoggedInUser } from './reducers/loginReducer'
import LoginRegisterPanel from './components/LoginRegisterPanel'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ContentPanel from './components/ContentPanel'
import './App.css'

const Main = styled.div`
  width: 100%;
  display: flex;
`

const App = () => {

  // redux states
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

export default App;
