const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// GET all timetables
router.get('/', timetableController.getAllTimetables);

// GET a timetable by ID
router.get('/:id', timetableController.getTimetableById);

// POST a new timetable
router.post('/', timetableController.addTimetable);

// PUT update a timetable by ID
router.put('/:id', timetableController.updateTimetable);

// DELETE a timetable by ID
router.delete('/:id', timetableController.deleteTimetable);

module.exports = router;