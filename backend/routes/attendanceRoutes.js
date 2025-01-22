const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');


// Define routes
router.get('/', attendanceController.getAllAttendance);
router.get('/:id', attendanceController.getAttendanceById);
router.post('/', attendanceController.createAttendance);
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;