import api from './api';

const addFriend = (userId: number) => {
  return api.post('/api/friends', { userId });
};

const getFriends = () => {
  return api.get('/friends');
};

export {
  addFriend,
  getFriends,
};
