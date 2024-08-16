import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ token, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Money Saver</h1>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <li><Link to="/" className="hover:text-gray-400">Bucket</Link></li>
            <li><Link to="/friends" className="hover:text-gray-400">Friends</Link></li>
            {token ? (
              <>
                <li><Link to="/profile" className="hover:text-gray-400">Profile</Link></li>
                <li>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Header
