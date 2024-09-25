import { createContext, useContext, useState } from 'react'

// Create the context
const UserContext = createContext<{
  user: any; setUser: React.Dispatch<React.SetStateAction<any>>
} | undefined>(undefined)

interface UserProviderProps {
  children: React.ReactNode
}

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
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
