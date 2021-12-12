import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginRegisterPanel = () => {

  const [ view, setView ] = useState(true)

  const toggleView = () => setView(!view)

  return (
    <div>
      <button onClick={toggleView}>
        { view ? 'register' : 'login' }
      </button>
      <hr />
      { view &&
        <LoginForm />
      }
      { !view &&
        <RegisterForm />
      }
    </div>
  )
}

export default LoginRegisterPanel
