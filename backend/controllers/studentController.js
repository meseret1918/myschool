const db = require('../db'); // Adjust this based on your database setup

exports.createStudent = async (req, res) => {
    const { name, age, grade } = req.body;
    try {
        const result = await db.query('INSERT INTO students (name, age, grade) VALUES (?, ?, ?)', [name, age, grade]);
        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create student', details: err });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students', details: err });
    }
};

exports.getStudentById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [studentId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch student', details: err });
    }
};

exports.updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const { name, age, grade } = req.body;
    try {
        const result = await db.query('UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?', [name, age, grade, studentId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update student', details: err });
    }
};

exports.deleteStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const result = await db.query('DELETE FROM students WHERE id = ?', [studentId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete student', details: err });
    }
};
