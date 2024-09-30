import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Toggle from './Toggle'
import UserIcon from './UserIcon'
import { User } from '../types'

interface HeaderProps {
  token: string
  user: User
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ token, user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>('dark')
  const menuRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') // Get previous theme from local storage

    if (currentTheme) {
      updateTheme(currentTheme)
    } else {
      updateTheme('dark') // Set default theme to dark
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  const updateTheme = (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')

    if (currentTheme === 'dark') {
      updateTheme('light')
    } else {
      updateTheme('dark')
    }
  }

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
          <ul className="flex flex-col items-center md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            {token && (
              <>
                <li><Link to="/" className="hover:text-font-muted">Bucket</Link></li>
                <li><Link to="/friends" className="hover:text-font-muted">Friends</Link></li>
                <li><Toggle value={theme === 'dark'} onChange={toggleTheme} /></li>
                {user && (
                  <li
                    className='flex flex-row items-center cursor-pointer'
                    ref={menuRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className='mr-4 text-font'>
                      {user?.username}
                    </span>
                    <UserIcon profileImg={user?.profile_picture} />
                    {isMenuOpen &&
                      <div>
                        <ul className='absolute top-14 right-20 bg-background border border-border-color rounded-lg shadow-lg'>
                          <li className='rounded-tr-lg rounded-tl-lg text-right hover:bg-input-hover'>
                            <Link to='/profile' className='block px-6 py-2'>Profile</Link>
                          </li>
                          <li className='rounded-br-lg rounded-bl-lg text-right hover:bg-input-hover'>
                            <button onClick={logout} className='w-full text-right block px-6 py-2'>Logout</button>
                          </li>
                        </ul>
                      </div>
                    }
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
