// src/components/AddFriendForm.jsx

import React, { useState } from 'react';
import { addFriend } from '../api';
import './AddFriendForm.css';

const AddFriendForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddFriend = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email address is required');
      return;
    }

    try {
      await addFriend({ email });
      setSuccess('Friend added successfully');
      setError('');
      setEmail('');
    } catch (error) {
      setError('Failed to add friend: ' + error.message);
    }
  };

  return (
    <div className="add-friend-form">
      <h2>Add a Friend</h2>
      <form onSubmit={handleAddFriend}>
        <div className="form-group">
          <label htmlFor="email">Friend's Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter friend's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
};

export default AddFriendForm;
