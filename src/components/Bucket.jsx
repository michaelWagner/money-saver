import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { getItems, getSavings } from '../api'
import ItemCard from './ItemCard'
import CreateItemCard from './CreateItemCard'

const Bucket = () => {
  const [items, setItems] = useState([])
  const [bucketItems, setBucketItems] = useState([])
  const [totalSavings, setTotalSavings] = useState(0)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM_CARD',
    drop: (item) => addItemToBucket(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems()
        setItems(response.data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    const fetchTotalSavings = async () => {
      try {
        const response = await getSavings()
        setTotalSavings(response.data.total_savings)
      } catch (error) {
        console.error('Error fetching savings:', error)
      }
    }

    fetchItems()
    fetchTotalSavings()
  }, [])

  const addItemToBucket = (item) => {
    debugger
    setBucketItems((prevItems) => [...prevItems, item])
    setTotalSavings((prevTotal) => prevTotal + item.price)
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
      <h3 className="text-xl font-semibold mt-4">Total Savings: ${totalSavings?.toFixed(2)}</h3>
      <CreateItemCard />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          item && <ItemCard key={item.id} item={item} addItem={addItemToBucket} />
        ))}
      </div>
    </div>
  )
}

export default Bucket
