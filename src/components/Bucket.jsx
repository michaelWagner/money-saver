import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { updateSavings } from '../services'

const Bucket = ({ items, onSavingsUpdate, savingsList }) => {
  const [bucketItems, setBucketItems] = useState([])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM_CARD',
    drop: (item) => addItemToBucket(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const addItemToBucket = async (item) => {
    console.log('Adding item to bucket:', item)
    setBucketItems((prevItems) => [...prevItems, item])

    await updateSavings(savingsList.id, item)
    console.log('Savings updated successfully')

    const currentTotal = parseFloat(savingsList?.total)
    const newTotal = (currentTotal + item.price).toFixed(2)
    handleUpdate(newTotal)
  }

  const handleUpdate = (newTotal) => {
    const updatedSavingsList = {
      ...savingsList,
      total: newTotal
    }
    onSavingsUpdate(updatedSavingsList)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Bucket</h2>
      <div
        ref={drop}
        className={`min-h-[150px] border-2 ${
          isOver ? 'border-yellow-400 bg-gray-700' : 'border-gray-600 bg-gray-800'
        } border-dashed p-4 text-center rounded-lg transition-colors duration-200 ease-in-out`}
      >
        {bucketItems.length > 0 ? (
          bucketItems.map((item, index) => (
            item && item.price && (
              <div key={index} className="p-2 bg-gray-700 rounded mb-2">
                {item.title}: ${item.price?.toFixed(2)}
              </div>
            )
          ))
        ) : (
          <p className="text-gray-400">Drag items here to add to your bucket</p>
        )}
      </div>
    </div>
  )
}
Bucket.propTypes = {
  items: PropTypes.array,
  savingsList: PropTypes.object.isRequired,
  onSavingsUpdate: PropTypes.func.isRequired,
}

export default Bucket
