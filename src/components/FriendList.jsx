import { useState, useEffect } from 'react';
import axios from 'axios';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await axios.get('/api/friends', { headers: { Authorization: `Bearer ${token}` } });
      setFriends(response.data);
    };

    const fetchAllUsers = async () => {
      const response = await axios.get('/api/users', { headers: { Authorization: `Bearer ${token}` } });
      setAllUsers(response.data);
    };

    fetchFriends();
    fetchAllUsers();
  }, []);

  const addFriend = async (userId) => {
    await axios.post('/api/friends', { userId }, { headers: { Authorization: `Bearer ${token}` } });
    setNewFriendName('');
    const response = await axios.get('/api/friends', { headers: { Authorization: `Bearer ${token}` } });
    setFriends(response.data);
  };

  return (
    <div className="friends">
      <h2>Friends</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend.username}: ${friend.total_savings.toFixed(2)}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {allUsers
          .filter((user) => user.username.includes(searchTerm) && !friends.find((f) => f.id === user.id))
          .map((user) => (
            <li key={user.id}>
              {user.username}
              <button onClick={() => addFriend(user.id)}>Add Friend</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FriendList;
