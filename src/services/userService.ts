import api from './api'

const getUserProfile = () => {
  return api.get('/api/users/profile')
}

const updateUserProfile = (data: {
  username: string,
  password: string,
  profile_picture?: string,
  email?: string,
}) => {
  return api.put('/api/users/profile', data)
}

const getUsers = () => {
  return api.get('/api/users')
}

export {
  getUserProfile,
  updateUserProfile,
  getUsers,
}
