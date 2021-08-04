import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { logout } from '../reducers/loginReducer'

const HeaderDiv = styled.div`
  & > * { 
    margin: 0.5em;
  };
  & > hr {
    margin-left: 0;
    margin-right: 0;
  }
`

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return(
    <HeaderDiv>
      Logged in as {user.name} 
      <button onClick={() => dispatch(logout())}>logout</button>
      <hr />
    </HeaderDiv>
  )
}

export default Header
