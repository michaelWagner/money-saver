const pool = require('../config/db');

// Get all friends for a user
const getFriends = async (req, res) => {
  try {
    const friends = await pool.query(
      'SELECT * FROM friends WHERE user_id = $1',
      [req.user.id]
    );
    res.status(200).json(friends.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a friend
const addFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const newFriend = await pool.query(
      'INSERT INTO friends (user_id, friend_id) VALUES ($1, $2) RETURNING *',
      [req.user.id, friendId]
    );
    res.status(201).json(newFriend.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a friend
const removeFriend = async (req, res) => {
  const { friendId } = req.params;
  try {
    await pool.query(
      'DELETE FROM friends WHERE user_id = $1 AND friend_id = $2',
      [req.user.id, friendId]
    );
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
