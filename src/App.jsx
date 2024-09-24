import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { setNavigate } from './services/history' // Import the utility
import Header from './components/Header'
import Home from './pages/Home'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const AppContent = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  useEffect(() => {
    setNavigate(navigate) // Set the navigate function for global access
  }, [navigate])

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken)
    console.log('app token: ', userToken)
    setToken(userToken)
  }

  return (
    <>
      <Header token={token} logout={logout} />
      <ErrorBoundary>
        <Routes>
          <Route
              path="/"
              element={<ProtectedRoute element={<Home />} token={token} />}
            />
            <Route
              path="/friends"
              element={<ProtectedRoute element={<FriendsPage />} token={token} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} token={token} />}
            />
            <Route path="/login" element={<LoginPage setToken={saveToken} />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
