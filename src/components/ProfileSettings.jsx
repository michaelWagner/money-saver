// src/components/ProfileSettings.jsx

import React, { useState } from 'react';
import { updateUserProfile } from '../api';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await updateUserProfile({ email, password });
      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    }
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="New email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
