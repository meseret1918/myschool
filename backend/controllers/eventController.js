const Event = require('./models/event');  // Updated model import

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();  // Changed to fetch events from the database
        console.log('Fetched Events:', events);  // Added for debugging, can be removed in production
        res.status(200).json(events);  // Send the events as a response to the client
    } catch (error) {
        console.error('Error fetching events:', error);  // Updated error message for better debugging
        res.status(500).json({ message: 'Error fetching events. Please try again later.' });
    }
};
