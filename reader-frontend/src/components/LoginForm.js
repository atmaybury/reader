import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './../reducers/loginReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [ loginInputs, setLoginInputs ] = useState({
    username: '',
    password: ''
  })

  const handleLoginInputs = e => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = e => {
    e.preventDefault()
    const user = {
      username: loginInputs.username,
      password: loginInputs.password
    }
    dispatch(login(user))
    setLoginInputs({
      username: '',
      password: ''
    })
  }

  return(
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      <div>
        Username:
        <input
          id="username-input"
          name="username"
          type="text"
          value={loginInputs.username}
          onChange={handleLoginInputs}
        />
      </div>
      <div>
        Password:
        <input
          id="password-input"
          name="password"
          type="text"
          value={loginInputs.password}
          onChange={handleLoginInputs}
        />
      </div>
      <button id="login-button" type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
