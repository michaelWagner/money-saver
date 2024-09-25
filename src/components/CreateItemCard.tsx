import { useState } from 'react'
import { addItem } from '../services'

const CreateItemCard: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && price) {
      addItem({title, price: parseFloat(price)})
      setTitle('')
      setPrice('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition duration-200"
      >
        Add Item
      </button>
    </form>
  )
}

export default CreateItemCard
