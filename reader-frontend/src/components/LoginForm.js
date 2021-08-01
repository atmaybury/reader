import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './../reducers/loginReducer'
import { useField } from '../hooks/index'
import { Input } from './styles/input.style'

const LoginForm = () => {

  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('text')

  const handleLogin = e => {
    e.preventDefault()
    const user = {
      username: username.fields.value,
      password: password.fields.value
    }
    dispatch(login(user))
    username.reset()
    password.reset()
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      <div>
        <Input
          { ...username.fields }
          placeholder="username"
        />
      </div>
      <div>
        <Input
          { ...password.fields }
          placeholder="password"
        />
      </div>
      <button id="login-button" type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
