const express = require('express');
const router = express.Router();
const { createSavings, getSavings, updateSavings } = require('../controllers/savingsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', getSavings);
router.post('/', createSavings);
router.post('/:savingsId', authMiddleware, updateSavings);

module.exports = router;
