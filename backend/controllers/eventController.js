const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    const { name, date, location, description } = req.body;
    try {
        const event = new Event({ name, date, location, description });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Error creating event' });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events' });
    }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event' });
    }
};

// Update event details
exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { name, date, location, description } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(eventId, { name, date, location, description }, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Error updating event' });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event' });
    }
};
