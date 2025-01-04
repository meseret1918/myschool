const Parent = require('../models/Parent');

exports.getAllParents = async (req, res) => {
    try {
        // Fetch all parents
        const parents = await Parent.findAll();

        // Log the fetched data for debugging
        console.log('Fetched Parents:', parents);

        // Send the fetched parents as a response
        res.status(200).json(parents);
    } catch (error) {
        console.error('Error fetching parents:', error);

        // Send error response
        res.status(500).json({ message: 'Error fetching parents. Please try again later.' });
    }
};
