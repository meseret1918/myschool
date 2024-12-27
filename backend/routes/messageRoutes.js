const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../utils/authMiddleware');

// Send a new message
router.post('/', authMiddleware.verifyAuthenticated, messageController.sendMessage);

// Get all messages for a user
router.get('/:userId', authMiddleware.verifyAuthenticated, messageController.getMessages);

// Delete a message
router.delete('/:messageId', authMiddleware.verifyAdmin, messageController.deleteMessage);

module.exports = router;
