// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ token, logout }) => {
  return (
    <header className="header">
      <h1>Money Saver</h1>
      <nav>
        <ul>
          <li><Link to="/">Bucket</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          {token ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
