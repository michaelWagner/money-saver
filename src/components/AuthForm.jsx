import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { loginUser, registerUser } from '../services'
import { useUser } from '../context/UserContext'

const AuthForm = ({ setToken }) => {
  const { setUser } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const login = async (username, password) => {
    const { data } = await loginUser(username, password)

    setToken(data.token)
    const user = {...data}
    delete user.token

    setUser(user)
    setError('')

    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await registerUser(username, password)
        setSuccess('Registration successful')
        login(username, password)
      } else {
        login(username, password)
      }
    } catch (error) {
      setError('Failed to authenticate: ' + error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-gray-800">
      <h2 className="text-2xl text-white mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 font-bold mb-2">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 font-bold mb-2">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-gray-900"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-blue-500 hover:underline focus:outline-none"
      >
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  )
}

AuthForm.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default AuthForm
