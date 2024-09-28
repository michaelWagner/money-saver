import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services'
import { User } from '../types'

interface AuthFormProps {
  setAuth: (user: User, token: string) => void
}

const AuthForm: React.FC<AuthFormProps> = ({ setAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const login = async (username: string, password: string) => {
    const { data } = await loginUser(username, password)

    const user = {...data}
    const token = user.token
    delete user.token

    setAuth(user, token)
    setError('')
    navigate('/')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await registerUser(username, password)
        setSuccess('Registration successful')
        login(username, password)
      } else {
        login(username, password)
      }
    } catch (error: any) {
      setError('Failed to authenticate: ' + error?.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-border-color rounded-lg bg-background">
      <h2 className="text-2xl text-font mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-font-muted text-sm font-semibold mb-2">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-font-muted text-sm font-semibold mb-2">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button type="submit" className="w-full py-3 mt-4 bg-primary text-font-button font-bold rounded hover:bg-primary-hover transition duration-200">
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

export default AuthForm
