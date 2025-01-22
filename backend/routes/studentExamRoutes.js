const express = require('express');
const router = express.Router();
const examController = require('../controllers/studentExamController');

// Route to get all exams
router.get('/exam', examController.getAllExams);  // Updated route

// Other routes
router.get('/exam/:id', examController.getExamById);
router.post('/exam', examController.createExam);
router.put('/exam/:id', examController.updateExam);
router.delete('/exam/:id', examController.deleteExam);

module.exports = router;
