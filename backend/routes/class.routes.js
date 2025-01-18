// class.routes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.get('/classes', classController.getClasses);
router.get('/classes/:id', classController.getClassById);
router.post('/classes', classController.createClass);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

module.exports = router;
