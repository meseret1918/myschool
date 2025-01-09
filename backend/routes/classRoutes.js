const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classController');

// Define routes
router.get('/', classesController.getAllClasses);
router.get('/:id', classesController.getClassById);
router.post('/', classesController.createClass);
router.put('/:id', classesController.updateClass);
router.delete('/:id', classesController.deleteClass);

module.exports = router;
