import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { loginUser, registerUser } from '../api'
import './AuthForm.css'

const AuthForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isRegister) {
        const { data } = await registerUser(username, password)

        setToken(data.token)
        setSuccess('Registration successful')
        setError('')
        navigate('/')
      } else {
        const { data } = await loginUser(username, password)

        setToken(data.token)
        setSuccess('Login successful')
        setError('')
        navigate('/')
      }
    } catch (error) {
      setError('Failed to authenticate: ' + error.message)
    }
  }

  return (
    <div className="auth-form">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} className="switch-button">
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  )
}

AuthForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default AuthForm
