const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Your MySQL username
    password: 'root12',     // Your MySQL password
    database: 'school_management', // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM events';
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to fetch events' });
            }
            res.json(results);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching events' });
    }
});

// Edit an event
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date } = req.body;

        // Ensure the required fields are provided
        if (!title || !date) {
            return res.status(400).json({ error: 'Title and date are required' });
        }

        const query = 'UPDATE events SET title = ?, description = ?, date = ? WHERE id = ?';

        db.query(query, [title, description, date, id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update event' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.json({
                message: 'Event updated successfully',
                event: {
                    id,
                    title,
                    description,
                    date
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating event' });
    }
});

module.exports = router;
