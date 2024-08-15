import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

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
    <Router>
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
    </Router>
  )
}

export default App
