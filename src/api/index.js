import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
};

const updateProfile = (token, data) => {
  return axios.put(`${API_URL}/profile`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export { register, login, getProfile, updateProfile };
