import { useState } from 'react'
import PropTypes from 'prop-types'
import { createSavings } from '../services'

const NewSavingsForm = ({ onSavingsCreated }) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createSavings(title)
      onSavingsCreated(data)
      setTitle('')
      setError(null)
    } catch (err) {
      setError('Failed to create savings')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-gray-800 shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="title" className="block text-white text-sm mb-2">
          Savings Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          placeholder="Enter savings title"
          required
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs italic">{error}</p>
      )}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition duration-200"
        >
          Create Savings
        </button>
      </div>
    </form>
  )
}

NewSavingsForm.propTypes = {
  onSavingsCreated: PropTypes.func.isRequired,
}

export default NewSavingsForm
