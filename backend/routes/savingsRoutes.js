const express = require('express');
const router = express.Router();
const { getSavings, updateSavings } = require('../controllers/savingsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', authMiddleware, getSavings);
router.post('/', authMiddleware, updateSavings);

module.exports = router;
