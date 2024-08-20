import React, { useState } from 'react'
import { addFriend } from '../services'

const AddFriendForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAddFriend = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Email address is required')
      return
    }

    try {
      await addFriend({ email })
      setSuccess('Friend added successfully')
      setError('')
      setEmail('')
    } catch (error) {
      setError('Failed to add friend: ' + error.message)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Add a Friend</h2>
      <form onSubmit={handleAddFriend}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-semibold mb-2">
            Friend's Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter friend's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:border-yellow-400"
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition duration-200"
        >
          Add Friend
        </button>
      </form>
    </div>
  )
}

export default AddFriendForm
