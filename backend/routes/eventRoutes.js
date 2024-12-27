const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../utils/authMiddleware');

// Create a new event
router.post('/', authMiddleware.verifyAdmin, eventController.createEvent);

// Get all events
router.get('/', authMiddleware.verifyAdmin, eventController.getAllEvents);

// Get an event by ID
router.get('/:eventId', authMiddleware.verifyAdmin, eventController.getEventById);

// Update event details
router.put('/:eventId', authMiddleware.verifyAdmin, eventController.updateEvent);

// Delete event
router.delete('/:eventId', authMiddleware.verifyAdmin, eventController.deleteEvent);

module.exports = router;
