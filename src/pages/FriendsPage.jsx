// src/pages/FriendsPage.jsx
import React, { useState, useEffect } from 'react'
import FriendList from '../components/FriendList'
import AddFriendForm from '../components/AddFriendForm'
import { getFriends } from '../api' // Assuming you have an api file

const FriendsPage = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await getFriends()
        setFriends(response.data)
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }

    fetchFriends()
  }, [])

  return (
    <div>
      <AddFriendForm />
      <FriendList friends={friends} />
    </div>
  )
}

export default FriendsPage
