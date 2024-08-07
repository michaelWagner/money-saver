import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile(token);
      setUser(response.data);
      setUsername(response.data.username);
      setProfilePicture(response.data.profile_picture);
    };
    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(token, { username, profilePicture });
    setUser({ ...user, username, profile_picture: profilePicture });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
