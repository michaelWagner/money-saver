import { useState } from 'react'
import PropTypes from 'prop-types'
import { register, login } from '../api'

const UserAuth = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = isRegister ? await register(username, password) : await login(username, password)
      setToken(response.data.token)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="auth-form">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  )
}

UserAuth.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default UserAuth
