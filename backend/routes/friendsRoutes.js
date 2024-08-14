const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');
const authMiddleware = require('../middlewares/authMiddleware');


// Get all friends for a user
router.get('/', authMiddleware, friendsController.getFriends);

// Add a new friend
router.post('/', authMiddleware, friendsController.addFriend);

// Remove a friend
router.delete('/:friendId', authMiddleware, friendsController.removeFriend);

module.exports = router;
