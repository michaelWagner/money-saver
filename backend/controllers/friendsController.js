const { Friend, User } = require('../models');

// Get all friends for a user
const getFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    const friends = await Friend.findAll({
      where: { user_id: userId },
      include: [{ model: User, as: 'Friend' }],
    });
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a friend
const addFriend = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.id;
  try {
    const newFriend = await Friend.create({
      user_id: userId,
      friend_id: friendId,
    });
    res.status(201).json(newFriend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a friend
const removeFriend = async (req, res) => {
  const { friendId } = req.params;
  const userId = req.user.id;
  try {
    await Friend.destroy({
      where: { user_id: userId, friend_id: friendId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFriends,
  addFriend,
  removeFriend,
};
