const pool = require('../config/db');

// Get current savings
const getSavings = async (req, res) => {
  try {
    const savings = await pool.query('SELECT * FROM savings WHERE user_id = $1', [req.user.id]);
    res.status(200).json(savings.rows[0]); // Assuming one savings record per user
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update savings by adding an item
const updateSavings = async (req, res) => {
  const { itemId } = req.body; // Assuming the item ID is passed in the body
  try {
    const item = await pool.query('SELECT price FROM items WHERE id = $1', [itemId]);
    if (item.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const updatedSavings = await pool.query(
      'UPDATE savings SET total = total + $1 WHERE user_id = $2 RETURNING *',
      [item.rows[0].price, req.user.id]
    );

    res.status(200).json(updatedSavings.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSavings,
  updateSavings,
};
