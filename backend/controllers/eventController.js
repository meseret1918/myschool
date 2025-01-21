const Timetable = require('./models/timetable');  // Updated model import

exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.findAll();  // Changed to fetch timetables from the database
        console.log('Fetched Timetables:', timetables);  // Added for debugging, can be removed in production
        res.status(200).json(timetables);  // Send the timetables as a response to the client
    } catch (error) {
        console.error('Error fetching timetables:', error);  // Updated error message for better debugging
        res.status(500).json({ message: 'Error fetching timetables. Please try again later.' });
    }
};
