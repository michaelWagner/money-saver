import React, { useState } from 'react'
import { updateUserProfile } from '../services'

const ProfileSettings = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await updateUserProfile({ email, password })
      setSuccess('Profile updated successfully')
      setError('')
    } catch (error) {
      setError('Failed to update profile: ' + error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Profile Settings</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-semibold mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="New email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400 font-semibold mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-gray-400 font-semibold mb-2">
            Confirm Password:
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default ProfileSettings
