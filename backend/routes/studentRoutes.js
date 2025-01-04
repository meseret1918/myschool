const express = require('express');
const mysql = require('mysql2');  // Import MySQL package
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

// Get all students
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM students';  // SQL query to fetch all students
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to fetch students' });
            }
            res.json(results);  // Send the result as a JSON response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching students' });
    }
});

// Add a new student
router.post('/', async (req, res) => {
    try {
        const { name, email, class_name, parent_id, phone, date_of_birth, address } = req.body;

        // Basic validation
        if (!name || !email || !class_name) {
            return res.status(400).json({ error: 'Name, email, and class name are required' });
        }

        // SQL query to insert a new student
        const query = 'INSERT INTO students (name, email, class_name, parent_id, phone, date_of_birth, address) VALUES (?, ?, ?, ?, ?, ?, ?)';

        db.query(query, [name, email, class_name, parent_id, phone, date_of_birth, address], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to add student' });
            }

            // Return the new student data along with the insert ID
            res.status(201).json({
                id: results.insertId,
                name,
                email,
                class_name,
                parent_id,
                phone,
                date_of_birth,
                address
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding student' });
    }
});

module.exports = router;
