const Teacher = require('../models/Teacher');

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        console.log('Fetched Teachers:', teachers);  // Added for debugging
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Error fetching teachers. Please try again later.' });
    }
};
