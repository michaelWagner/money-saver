import axios from 'axios'
import { navigate } from './history' // Import the navigation utility

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Retrieve token from local storage or context

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    else {
      console.log('No token found')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('Error intercepted:', error)

    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login')
      navigate('/login') // Redirect to login if unauthorized
    }

    return Promise.reject(error)
  }
)

export default api
