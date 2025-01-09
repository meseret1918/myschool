const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Get all classes
router.get('/classes', classController.getClasses);

// Create a new class
router.post('/classes', classController.createClass);

// Update an existing class
router.put('/classes/:id', classController.updateClass);

// Delete a class
router.delete('/classes/:id', classController.deleteClass);

module.exports = router;
