import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api';

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getUserProfile();
      setUser(response.data);
      setUsername(response.data.username);
      setProfilePicture(response.data.profile_picture);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile({ username, profilePicture });
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

export default ProfileInfo;
