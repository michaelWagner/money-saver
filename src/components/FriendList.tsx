import { useState, useEffect } from 'react'
import { addFriend, getFriends, getUsers } from '../services'
import { User } from '../types'

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // const fetchFriends = async () => {
    //   const { data } = await getFriends()

    //   setFriends(data)
    // }

    const fetchAllUsers = async () => {
      const { data } = await getUsers()

      setAllUsers(data)
    }

    // fetchFriends()
    fetchAllUsers()
  }, [])

  const addNewFriend = async (userId: number) => {
    await addFriend(userId)
    const { data } = await getFriends()

    setFriends(data)
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Friends</h2>
      <ul className="mb-6">
        {friends.map((friend, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="text-lg text-gray-700">{friend.username}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul>
        {allUsers
          .filter((user) => user.username.includes(searchTerm) && !friends.find((f) => f.id === user.id))
          .map((user) => (
            <li key={user.id} className="flex justify-between items-center mb-2">
              <span className="text-lg text-gray-700">{user.username}</span>
              <button
                onClick={() => addNewFriend(user.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Friend
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default FriendList
