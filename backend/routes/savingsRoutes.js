const express = require('express');
const router = express.Router();
const savingsController = require('../controllers/savingsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get current savings
router.get('/', authMiddleware, savingsController.getSavings);

// Update savings by adding an item
router.post('/', authMiddleware, savingsController.updateSavings);

module.exports = router;
