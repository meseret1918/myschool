const Event = require('./models/event');  // Updated model import

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();  // Changed to fetch events
        console.log('Fetched Events:', events);  // Added for debugging
        res.status(200).json(events);  // Send the events in the response
    } catch (error) {
        console.error('Error fetching events:', error);  // Updated error message
        res.status(500).json({ message: 'Error fetching events. Please try again later.' });
    }
};
