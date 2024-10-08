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
import { useUser, UserProvider } from './context/UserContext'
import { User } from './types'
import './App.css'

const AppContent = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  const userContext = useUser()

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const { user, setUser } = userContext

  useEffect(() => {
    if (!user && token) {
      const storedUser = localStorage.getItem('currentUser')

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [token, user, setUser])

  useEffect(() => {
    setNavigate(navigate) // Set the navigate function for global access
  }, [navigate])

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }

  const setAuth = (user: User, token: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('currentUser', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  return (
    <div className='bg-background h-screen'>
      <Header token={token} user={user} logout={logout} />
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
            <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  )
}

export default App
