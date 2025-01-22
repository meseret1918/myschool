const Parent = require('../models/Parent');

exports.getAllParents = async (req, res) => {
    try {
        // Fetch all parents from the database
        const parents = await Parent.findAll();

        // Log the fetched data for debugging (you can remove this in production)
        console.log('Fetched Parents:', parents);

        // Check if no parents are found
        if (!parents || parents.length === 0) {
            return res.status(404).json({ message: 'No parents found.' });
        }

        // Send the fetched parents as a response
        res.status(200).json(parents);
    } catch (error) {
        console.error('Error fetching parents:', error.message); 

        // Send error response with detailed message
        res.status(500).json({
            message: 'Error fetching parents. Please try again later.',
            error: error.message,  // Optionally include the error message in the response for debugging purposes
        });
    }
};
