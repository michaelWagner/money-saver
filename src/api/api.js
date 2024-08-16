import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Retrieve token from local storage or context

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
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
    const navigate = useNavigate()
    if (error.response && error.response.status === 401) {
      navigate('/login') // Redirect to login if unauthorized
    }

    return Promise.reject(error)
  }
)

export default api
