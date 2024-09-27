import { useState } from 'react'
import { createSavings } from '../services'

interface NewSavingsFormProps {
  onSuccess: (savings: any) => void
}

const NewSavingsForm: React.FC<NewSavingsFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await createSavings(title)
      onSuccess(data)
      setTitle('')
      setError(null)
    } catch (err) {
      setError('Failed to create savings')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-background rounded">
      <div className="mb-4">
        <label htmlFor="title" className="block text-font-muted text-sm font-semibold mb-2">
          Savings Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
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
          className="w-full py-3 mt-4 bg-primary text-font-button font-bold rounded hover:bg-primary-hover transition duration-200"
        >
          Create Savings
        </button>
      </div>
    </form>
  )
}

export default NewSavingsForm
