const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date(); // Current timestamp for both createdAt and updatedAt
    const newUser = await pool.query(
      'INSERT INTO users (username, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, now, now]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.rows[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { username, profilePicture } = req.body;
  try {
    const updatedUser = await pool.query(
      'UPDATE users SET username = $1, profile_picture = $2 WHERE id = $3 RETURNING *',
      [username, profilePicture, req.user.id]
    );
    res.json(updatedUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };
