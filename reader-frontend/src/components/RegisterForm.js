import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import userService from '../services/user'

const RegisterForm = () => {

  const dispatch = useDispatch()

  const [ registerInputs, setRegisterInputs ] = useState({
    username: '',
    name: '',
    password: ''
  })

  const handleRegisterInputs = e => {
    setRegisterInputs({
      ...registerInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async e => {
    e.preventDefault()
    const user = {
      username: registerInputs.username,
      name: registerInputs.name,
      password: registerInputs.password
    }
    try {
      await userService.register(user)
      dispatch(login({ username: user.username, password: user.password }))
    } catch (err) {
      console.log(err.response.data.error)
    } finally {
      setRegisterInputs({
        username: '',
        name: '',
        password: ''
      })
    }
  }

  return(
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <div>
        Username:
        <input
          id="username-input"
          name="username"
          type="text"
          value={registerInputs.username}
          onChange={handleRegisterInputs}
        />
      </div>
      <div>
        Name:
        <input
          id="name-input"
          name="name"
          type="text"
          value={registerInputs.name}
          onChange={handleRegisterInputs}
        />
      </div>
      <div>
        Password:
        <input
          id="password-input"
          name="password"
          type="password"
          value={registerInputs.password}
          onChange={handleRegisterInputs}
        />
      </div>
      <button id="register-button" type="submit">Register</button>
    </form>
  )
}

export default RegisterForm
