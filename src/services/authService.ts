import api from './api';

const registerUser = (username: string, password: string) => {
  return api.post('/api/users/register', { username, password });
};

const loginUser = (username: string, password: string) => {
  return api.post('/api/users/login', { username, password });
};

const getUserProfile = () => {
  return api.get('/api/users/profile');
};

const updateUserProfile = (data: { username: string; profile_picture: string }) => {
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
