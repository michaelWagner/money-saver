import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ token, element }) => {
  console.log('ProtectedRoute token:', token)
  console.log('ProtectedRoute element:', element)

  if (!token) {
    // Handle the case where token is not provided
    return <Navigate to="/login" />
  }

  // Render the protected route content
  return element
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  token: PropTypes.string.isRequired,
}

export default ProtectedRoute