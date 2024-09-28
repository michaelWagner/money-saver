import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { updateSavings } from '../services'
import { Item, Savings } from '../types'

interface BucketProps {
  items?: Item[] // TODO: This should show the items that have been added to the bucket 
  savings: Savings
  onSavingsUpdate: (savings: Savings) => void
}

const Bucket: React.FC<BucketProps> = ({ items, onSavingsUpdate, savings }) => {
  const [bucketItems, setBucketItems] = useState<Item[]>([])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM_CARD',
    drop: (item: Item) => addItemToBucket(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const addItemToBucket = async (item: Item) => {
    console.log('Adding item to bucket:', item)
    setBucketItems((prevItems) => [...prevItems, item])

    await updateSavings(savings.id, item)
    console.log('Savings updated successfully')

    const currentTotal = parseFloat(savings?.total) // Make sure this is a number
    const newTotal = (currentTotal + item.price).toFixed(2)
    handleUpdate(newTotal)
  }

  const handleUpdate = (newTotal: string) => {
    const updatedSavings = {
      ...savings,
      total: newTotal
    }
    onSavingsUpdate(updatedSavings)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-background rounded-lg shadow-md text-font">
      <h2 className="text-2xl font-bold text-font mb-4">Bucket</h2>
      <div
        ref={drop}
        className={`min-h-[150px] border-2 ${
          isOver ? 'border-input-focus bg-input-hover' : 'border-border-color bg-background'
        } border-dashed p-4 text-center rounded-lg transition-colors duration-200 ease-in-out`}
      >
        {bucketItems.length > 0 ? (
          bucketItems.map((item, index) => (
            item && item.price && (
              <div key={index} className="p-2 bg-card-bg drop-shadow-lg rounded mb-2">
                {item.title}: ${item.price?.toFixed(2)}
              </div>
            )
          ))
        ) : (
          <p className=" text-lg text-font-muted">Drag items here to add to your bucket</p>
        )}
      </div>
    </div>
  )
}

export default Bucket
