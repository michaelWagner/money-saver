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
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Savings Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
