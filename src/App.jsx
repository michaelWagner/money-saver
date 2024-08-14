import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Bucket from './components/Bucket';
import Friends from './components/Friends';
import Profile from './components/Profile';
import UserAuth from './components/UserAuth';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return (
    <Router>
      <Header token={token} logout={logout} />
      <ErrorBoundary>
        <Routes>
          <Route
              path="/"
              element={<ProtectedRoute element={<Bucket />} token={token} />}
            />
            <Route
              path="/friends"
              element={<ProtectedRoute element={<Friends />} token={token} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} token={token} />}
            />
            <Route path="/login" element={<UserAuth setToken={saveToken} />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
