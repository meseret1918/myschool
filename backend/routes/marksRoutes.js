const express = require('express');
const router = express.Router();
const studentMarkController = require('../controllers/studentMarkController');

// Define routes
router.get('/', studentMarkController.getAllMarks);  
router.get('/:id', studentMarkController.getMarkById);  
router.post('/', studentMarkController.createMark);  
router.put('/:id', studentMarkController.updateMark);  
router.delete('/:id', studentMarkController.deleteMark);  

module.exports = router;
