const { Item } = require('../models');

const getItems = async (req, res) => {
  const userId = req.user.id;
  try {
    const items = await Item.findAll({ where: { user_id: userId } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addItem = async (req, res) => {
  const userId = req.user.id;
  console.log('userId', userId);
  const { title, price } = req.body;
  try {
    const newItem = await Item.create({ title, price, user_id: userId });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const item = await Item.findOne({ where: { id, user_id: userId } });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const deletedItem = await Item.destroy({ where: { id, user_id: userId } });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getItems,
  addItem,
  getItemById,
  deleteItem
};
