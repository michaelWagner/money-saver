import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

// Create the context
const UserContext = createContext()

// Create a provider component
export const UserProvider = ({ children }) => {
  // Add prop validation for 'children'
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }

  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook for accessing user context
export const useUser = () => {
  return useContext(UserContext)
}
