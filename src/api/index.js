import api from './api'

// const API_URL = 'http://localhost:8080/api'

// LOGIN AND REGISTER
const registerUser = (username, password) => {
  return api.post('/api/users/register', { username, password })
}

const loginUser = (username, password) => {
  return api.post('/api/users/login', { username, password })
}

const getUserProfile = () => {
  return api.get('/api/users/profile')
}

const updateUserProfile = (data) => {
  return api.put('/api/users/profile', data)
}

// Home
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

// Friends
const addFriend = (userId) => {
  return api.post('/api/friends', { userId })
}

const getFriends = () => {
  return api.get('/friends')
}

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getItems,
  addItem,
  addFriend,
  getFriends,
  getSavings,
  updateSavings
}
