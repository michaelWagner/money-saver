import api from './api'

// const API_URL = 'http://localhost:8080/api'

// LOGIN AND REGISTER
const register = (username, password) => {
  return api.post('/api/users/register', { username, password })
}

const login = (username, password) => {
  return api.post('/api/users/login', { username, password })
}

const getProfile = () => {
  return api.get('/api/users/profile')
}

const updateProfile = (data) => {
  return api.put('/api/users/profile', data)
}

// BUCKET
const getItems = () => {
  return api.get('/api/items')
}
const addItem = (item) => {
  return api.post('/api/items', item)
}

const getSavings = () => {
  return api.get('/api/savings')
}

const updateSavings = (item) => {
  return api.post('/api/savings', item)
}

export {
  register,
  login,
  getProfile,
  updateProfile,
  getItems,
  addItem,
  getSavings,
  updateSavings
}
