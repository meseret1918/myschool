const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection
const { Op } = require('sequelize'); // Optional for advanced querying
const Teacher = require('../models/Teacher'); // Sequelize model for the teachers table

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Error fetching teachers. Please try again later.' });
    }
});

// Get a specific teacher by ID
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ message: 'Error fetching teacher. Please try again later.' });
    }
});

// Add a new teacher
router.post('/', async (req, res) => {
    try {
        const {
            FirstName,
            LastName,
            Gender,
            Age,
            ContactNumber,
            Email,
            Qualification,
            ExperienceYears,
            HireDate,
            SubjectsTaught,
            Salary,
        } = req.body;

        // Basic validation
        if (
            !FirstName ||
            !LastName ||
            !Gender ||
            !Age ||
            !ContactNumber ||
            !Email ||
            !Qualification ||
            !ExperienceYears ||
            !HireDate ||
            !SubjectsTaught ||
            !Salary
        ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate numeric fields
        if (isNaN(Age) || isNaN(Salary) || isNaN(ExperienceYears)) {
            return res.status(400).json({ error: 'Age, Salary, and ExperienceYears must be valid numbers' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Create new teacher
        const newTeacher = await Teacher.create({
            FirstName,
            LastName,
            Gender,
            Age,
            ContactNumber,
            Email,
            Qualification,
            ExperienceYears,
            HireDate,
            SubjectsTaught,
            Salary,
        });

        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error adding teacher:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Teacher already exists' });
        }
        res.status(500).json({ message: 'Error adding teacher. Please try again later.' });
    }
});

// Edit a teacher (Update teacher data)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            FirstName,
            LastName,
            Gender,
            Age,
            ContactNumber,
            Email,
            Qualification,
            ExperienceYears,
            HireDate,
            SubjectsTaught,
            Salary,
        } = req.body;

        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Validate numeric fields
        if (Age !== undefined && (isNaN(Age) || Age <= 0)) {
            return res.status(400).json({ error: 'Age must be a valid positive number' });
        }
        if (Salary !== undefined && (isNaN(Salary) || Salary <= 0)) {
            return res.status(400).json({ error: 'Salary must be a valid positive number' });
        }
        if (ExperienceYears !== undefined && (isNaN(ExperienceYears) || ExperienceYears < 0)) {
            return res.status(400).json({ error: 'ExperienceYears must be a valid number' });
        }

        // Validate email format
        if (Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Update teacher data
        teacher.FirstName = FirstName || teacher.FirstName;
        teacher.LastName = LastName || teacher.LastName;
        teacher.Gender = Gender || teacher.Gender;
        teacher.Age = Age || teacher.Age;
        teacher.ContactNumber = ContactNumber || teacher.ContactNumber;
        teacher.Email = Email || teacher.Email;
        teacher.Qualification = Qualification || teacher.Qualification;
        teacher.ExperienceYears = ExperienceYears || teacher.ExperienceYears;
        teacher.HireDate = HireDate || teacher.HireDate;
        teacher.SubjectsTaught = SubjectsTaught || teacher.SubjectsTaught;
        teacher.Salary = Salary || teacher.Salary;

        await teacher.save();

        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: 'Error updating teacher. Please try again later.' });
    }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        await teacher.destroy();

        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Error deleting teacher. Please try again later.' });
    }
});

module.exports = router;
