const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const authMiddleware = require('../middlewares/authMiddleware');


// Get all items
router.get('/', authMiddleware, itemsController.getItems);

// Add a new item
router.post('/', authMiddleware, itemsController.addItem);

// Get a specific item by ID
router.get('/:id', authMiddleware, itemsController.getItemById);

// Delete an item by ID
router.delete('/:id', authMiddleware, itemsController.deleteItem);

module.exports = router;
