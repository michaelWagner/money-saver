const express = require('express');
const { registerUser, loginUser, getProfile, updateProfile, getUsers } = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/', authMiddleware, getUsers);

module.exports = router;
