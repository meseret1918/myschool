const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students. Please try again later.' });
    }
});

// Get a specific student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Error fetching student. Please try again later.' });
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

        const newStudent = await Student.create({
            name,
            email,
            class_name,
            parent_id,
            phone,
            date_of_birth,
            address
        });

        res.status(201).json(newStudent); 
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Error adding student. Please try again later.' });
    }
});

// Edit a student (Update student data)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, class_name, parent_id, phone, date_of_birth, address } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update student data
        student.name = name || student.name;
        student.email = email || student.email;
        student.class_name = class_name || student.class_name;
        student.parent_id = parent_id || student.parent_id;
        student.phone = phone || student.phone;
        student.date_of_birth = date_of_birth || student.date_of_birth;
        student.address = address || student.address;

        await student.save();

        res.status(200).json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Error updating student. Please try again later.' });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await student.destroy();

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Error deleting student. Please try again later.' });
    }
});

module.exports = router;
