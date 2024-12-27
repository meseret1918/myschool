const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../utils/authMiddleware');

// Create a new teacher
router.post('/', authMiddleware.verifyAdmin, teacherController.createTeacher);

// Get all teachers
router.get('/', authMiddleware.verifyAdmin, teacherController.getAllTeachers);

// Get a teacher by ID
router.get('/:teacherId', authMiddleware.verifyAdmin, teacherController.getTeacherById);

// Update teacher details
router.put('/:teacherId', authMiddleware.verifyAdmin, teacherController.updateTeacher);

// Delete teacher
router.delete('/:teacherId', authMiddleware.verifyAdmin, teacherController.deleteTeacher);

module.exports = router;
