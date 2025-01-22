const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST: Send a new message
router.post('/messages', messageController.sendMessage);

// GET: Get messages for a specific user
router.get('/messages/:userId', messageController.getMessages);

// DELETE: Delete a message by ID
router.delete('/messages/:messageId', messageController.deleteMessage);

module.exports = router;