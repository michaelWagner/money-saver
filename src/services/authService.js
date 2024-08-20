import api from './api';

const registerUser = (username, password) => {
  return api.post('/api/users/register', { username, password });
};

const loginUser = (username, password) => {
  return api.post('/api/users/login', { username, password });
};

const getUserProfile = () => {
  return api.get('/api/users/profile');
};

const updateUserProfile = (data) => {
  return api.put('/api/users/profile', data);
};

const getUsers = () => {
  return api.get('/api/users');
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
};
