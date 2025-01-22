const express = require('express'); 
const mysql = require('mysql2');
const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12',
    database: 'school_management',
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

// Get an event by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM events WHERE id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to fetch event' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.json(results[0]); 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching event' });
    }
});

// Add an event
router.post('/', async (req, res) => {
    try {
        const { title, description, date } = req.body;

        if (!title || !date) {
            return res.status(400).json({ error: 'Title and date are required' });
        }

        const query = 'INSERT INTO events (title, description, date) VALUES (?, ?, ?)';

        db.query(query, [title, description, date], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to add event' });
            }

            res.status(201).json({
                message: 'Event added successfully',
                event: {
                    id: results.insertId,
                    title,
                    description,
                    date
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding event' });
    }
});

// Edit an event
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date } = req.body;

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

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM events WHERE id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete event' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.json({ message: 'Event deleted successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting event' });
    }
});

module.exports = router;
