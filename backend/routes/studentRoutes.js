const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection (assuming you have the connection set up already)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Your MySQL username
    password: 'root12',  // Your MySQL password
    database: 'school_management',  // Your database name
});

// Route to get all students
router.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';  // SQL query to fetch all students

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching students');
        }
        res.json(results);  // Send the result as a JSON response
    });
});

// Route to get a single student by ID
router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;  // Get student ID from URL parameter

    const query = 'SELECT * FROM students WHERE id = ?';  // SQL query to fetch a single student

    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching student');
        }
        if (results.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.json(results[0]);  // Send the student data as a JSON response
    });
});

// Route to add a new student
router.post('/students', (req, res) => {
    const { name, email, phone, date_of_birth, address, parent_id } = req.body;  // Get data from the request body

    const query = 'INSERT INTO students (name, email, phone, date_of_birth, address, parent_id) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [name, email, phone, date_of_birth, address, parent_id], (err, results) => {
        if (err) {
            return res.status(500).send('Error adding student');
        }
        res.status(201).json({ id: results.insertId, name, email });  // Return the new student data
    });
});

// Route to update an existing student
router.put('/students/:id', (req, res) => {
    const studentId = req.params.id;  // Get student ID from URL parameter
    const { name, email, phone, date_of_birth, address, parent_id } = req.body;  // Get updated data

    const query = 'UPDATE students SET name = ?, email = ?, phone = ?, date_of_birth = ?, address = ?, parent_id = ? WHERE id = ?';

    db.query(query, [name, email, phone, date_of_birth, address, parent_id, studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Error updating student');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }
        res.json({ message: 'Student updated successfully' });
    });
});

// Route to delete a student
router.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;  // Get student ID from URL parameter

    const query = 'DELETE FROM students WHERE id = ?';

    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Error deleting student');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }
        res.json({ message: 'Student deleted successfully' });
    });
});

module.exports = router;
