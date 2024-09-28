import api from './api'

const registerUser = (username: string, password: string) => {
  return api.post('/api/users/register', { username, password })
}

const loginUser = (username: string, password: string) => {
  return api.post('/api/users/login', { username, password })
}

export {
  registerUser,
  loginUser,
  }
