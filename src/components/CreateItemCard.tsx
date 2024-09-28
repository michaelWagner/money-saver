import { useState } from 'react'
import { addItem } from '../services'

interface CreateItemCardProps {
  onSuccess: () => void
}
const CreateItemCard: React.FC<CreateItemCardProps> = ({onSuccess}) => {
  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && price) {
      addItem({title, price: parseFloat(price)})
      setTitle('')
      setPrice('')
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-lg shadow-md">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:border-input-focus"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:border-input-focus"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-primary text-font-button font-bold rounded hover:bg-primary-hover transition duration-200"
      >
        Add Item
      </button>
    </form>
  )
}

export default CreateItemCard
