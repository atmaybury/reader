import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import userService from '../services/user'
import { useField } from '../hooks/index'
import { Input } from './styles/input.style'

const RegisterForm = () => {

  const dispatch = useDispatch()

  const username = useField('text')
  const name = useField('text')
  const password = useField('password')

  const handleRegister = async e => {
    e.preventDefault()
    const user = {
      username: username.fields.value,
      name: name.fields.value,
      password: password.fields.value,
    }
    try {
      await userService.register(user)
      dispatch(login({ username: user.username, password: user.password }))
    } catch (err) {
      console.log(err.response.data.error)
    } finally {
      username.reset()
      name.reset()
      password.reset()
    }
  }

  return(
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <div>
        <Input
          { ...username.fields }
          placeholder="username"
        />
      </div>
      <div>
        <Input
          { ...name.fields }
          placeholder="name"
        />
      </div>
      <div>
        <Input
          { ...password.fields }
          placeholder="password"
        />
      </div>
      <button id="register-button" type="submit">Register</button>
    </form>
  )
}

export default RegisterForm
