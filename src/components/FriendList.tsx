import { useState, useEffect } from 'react'
import { addFriend, getFriends, getUsers } from '../services'
import { User } from '../types'

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // const fetchFriends = async () => {
    //   const { data } = await getFriends()

    //   setFriends(data)
    // }

    const fetchAllUsers = async () => {
      const { data } = await getUsers()

      const users = data.filter((user: User) => user.id !== 1)

      setFilteredUsers(data)
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
    <div className="max-w-md w-full mx-auto p-4 bg-background rounded-lg shadow-md">
      <h2 className="text-2xl text-font font-bold mb-4">Friends</h2>
      <ul className="mb-6">
        {friends.map((friend, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="text-lg text-font">{friend.username}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 text-font border border-border-color rounded-lg focus:outline-none focus:ring-1 focus:ring-input-focus"
      />
      <ul>
        {filteredUsers
          .filter((user) => user.username.includes(searchTerm) && !friends.find((f) => f.id === user.id))
          .map((user) => (
            <li key={user.id} className="flex justify-between items-center mb-2">
              <span className="text-lg text-font">{user.username}</span>
              <button
                onClick={() => addNewFriend(user.id)}
                className="px-4 py-2 bg-primary text-font-button rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-1 focus:ring-input-focus"
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
