import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: React.ReactNode
  token: string | null
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token, element }) => {
  if (!token) {
    // Handle the case where token is not provided
    return <Navigate to="/login" />
  }

  // Render the protected route content
  return element
}

export default ProtectedRoute