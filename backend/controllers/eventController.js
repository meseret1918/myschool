const Timetable = require('./models/timetable');  // Updated model import

exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.findAll();  
        console.log('Fetched Timetables:', timetables); 
        res.status(200).json(timetables);  
    } catch (error) {
        console.error('Error fetching timetables:', error);  
        res.status(500).json({ message: 'Error fetching timetables. Please try again later.' });
    }
};
