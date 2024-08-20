// src/pages/Home.jsx
import React, { useState, useEffect } from 'react'
import Bucket from '../components/Bucket'
import { getItems, getSavings } from '../services'

const Home = () => {
  const [items, setItems] = useState([])
  const [totalSavings, setTotalSavings] = useState(0)

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

  return (
    <div>
      <Bucket items={items} totalSavings={totalSavings} />
    </div>
  )
}

export default Home
