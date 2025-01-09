const express = require('express');
const router = express.Router();
const studentAttendanceController = require('../controllers/studentAttendanceController');

// Define routes
router.get('/', studentAttendanceController.getAllAttendance);
router.get('/:id', studentAttendanceController.getAttendanceById);
router.post('/', studentAttendanceController.createAttendance);
router.put('/:id', studentAttendanceController.updateAttendance);
router.delete('/:id', studentAttendanceController.deleteAttendance);

module.exports = router;
