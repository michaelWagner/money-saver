import React, { useState } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  const resetError = () => setHasError(false)

  // Custom hook to handle errors in child components
  const ErrorFallback = () => (
    <div>
      <h1>Something went wrong. Please try again later.</h1>
      <button onClick={resetError}>Retry</button>
    </div>
  )

  if (hasError) {
    return <ErrorFallback />
  }

  try {
    return React.Children.only(children)
  } catch (error) {
    setHasError(true)
    return <ErrorFallback />
  }
}

export default ErrorBoundary
