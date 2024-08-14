import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemCard from './ItemCard'
import CreateItemCard from './CreateItemCard'
import { addItem, getItems, getSavings } from '../api'

const Bucket = () => {
  const [items, setItems] = useState([])
  const [bucketItems, setBucketItems] = useState([])
  const [totalSavings, setTotalSavings] = useState(0)

  // Fetch items and total savings from the backend
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems()
        console.log('items: ', response.data)
        setItems(response.data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
  
    const fetchTotalSavings = async () => {
      try {
        const response = await getSavings()
        console.log('savings: ', response.data)
        setTotalSavings(response.data.total_savings)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
    fetchItems()
    fetchTotalSavings()
  }, [])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM_CARD',
    drop: (item) => addToBucket(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const addToBucket = async (item) => {
    setBucketItems([...bucketItems, item])
    setTotalSavings(totalSavings + item.price)
    // await axios.post('/api/savings', { item }, { headers: { Authorization: `Bearer ${token}` } })
    // Show success animation here (like confetti)
  }

  const addNewItem = async (title, price) => {
    const newItem = { id: items.length + 1, title, price }
    setItems([...items, newItem])
    await addItem(newItem)
  }

  return (
    <div className="bucket">
      <h2>Bucket</h2>
      <div ref={drop} className={`dropzone ${isOver ? 'over' : ''}`}>
        {bucketItems.map((item, index) => (
          item && item.price &&
          <div key={index} className="bucket-item">
            {item?.title}: ${item?.price?.toFixed(2)}
          </div>
        ))}
      </div>
      <h3>Total Savings: ${totalSavings?.toFixed(2)}</h3>
      <CreateItemCard addItem={addNewItem} />
      <div className="item-list">
        {items.map((item) => (
          item &&
          <ItemCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Bucket
