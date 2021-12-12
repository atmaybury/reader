import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeLoginError, login } from './../reducers/loginReducer'
import { useField } from '../hooks/index'
import { Input, FormDiv } from './common'

const LoginForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const username = useField('text')
  const password = useField('text')

  const handleLogin = e => {
    e.preventDefault()
    const credentials = {
      username: username.fields.value,
      password: password.fields.value
    }
    dispatch(login(credentials))
    username.reset()
    password.reset()
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      {user.error && 
      <>
        <p>{user.error}</p><button onClick={() => dispatch(removeLoginError())}>X</button>
      </>
      }
      <FormDiv>
        <Input
          { ...username.fields }
          placeholder="username"
        />
        <Input
          { ...password.fields }
          placeholder="password"
        />
      </FormDiv>
      <button id="login-button" type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
