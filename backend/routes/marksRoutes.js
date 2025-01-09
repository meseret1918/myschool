const express = require('express');
const router = express.Router();
const studentMarkController = require('../controllers/studentMarkController');

// Define routes
router.get('/', studentMarkController.getAllMarks);  // Fetch all marks
router.get('/:id', studentMarkController.getMarkById);  // Fetch mark by ID
router.post('/', studentMarkController.createMark);  // Create mark
router.put('/:id', studentMarkController.updateMark);  // Update mark by ID
router.delete('/:id', studentMarkController.deleteMark);  // Delete mark by ID

module.exports = router;
