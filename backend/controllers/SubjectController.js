const Subject = require('../models/Subject');

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        console.log('Fetched Subjects:', subjects);
        res.status(200).json(subjects); 
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Error fetching subjects. Please try again later.' });
    }
};
