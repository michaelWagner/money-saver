const pool = require('../config/db');

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await pool.query('SELECT * FROM items');
    res.status(200).json(items.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new item (if needed)
const addItem = async (req, res) => {
  const { title, price } = req.body;
  const now = new Date(); // Current timestamp for both createdAt and updatedAt
  try {
    const newItem = await pool.query(
      'INSERT INTO items (title, price, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) RETURNING *',
      [title, price, now, now]
    );
    res.status(201).json(newItem.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single item by ID (if needed)
const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (item.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an item by ID (if needed)
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getItems,
  addItem,
  getItemById,
  deleteItem,
};
