import { useState } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  token: string
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ token, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <header className="bg-background text-font mb-6">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl text-font font-bold">Money Saver</h1>
        <button
          className="md:hidden text-font focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            {token && (
              <>
                <li><Link to="/" className="hover:text-font-muted">Bucket</Link></li>
                <li><Link to="/friends" className="hover:text-font-muted">Friends</Link></li>
                <li><Link to="/profile" className="hover:text-font-muted">Profile</Link></li>
                <li>
                  <button onClick={logout} className="text-font hover:text-font-muted">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
