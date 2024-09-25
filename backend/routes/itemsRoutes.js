const express = require('express');
const router = express.Router();
const { getItems, addItem, getItemById, deleteItem } = require('../controllers/itemsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', getItems);
router.post('/', addItem);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

module.exports = router;
