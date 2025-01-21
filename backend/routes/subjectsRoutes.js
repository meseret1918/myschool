const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');  // Assuming you have a Subject model

// Get all subjects
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.findAll();  // Get all subjects
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Error fetching subjects. Please try again later.' });
    }
});

// Get a specific subject by ID
router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);  // Get subject by ID
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json(subject);
    } catch (error) {
        console.error('Error fetching subject:', error);
        res.status(500).json({ message: 'Error fetching subject. Please try again later.' });
    }
});

// Add a new subject
router.post('/', async (req, res) => {
    try {
        const { subName, subCode, sessions, sclassId, schoolId, teacherId } = req.body;

        // Basic validation
        if (!subName || !subCode || !sessions) {
            return res.status(400).json({ error: 'Subject name, code, and sessions are required' });
        }

        const newSubject = await Subject.create({
            subName,
            subCode,
            sessions,
            sclassId,
            schoolId,
            teacherId
        });

        res.status(201).json(newSubject); // Return the created subject object
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({ message: 'Error adding subject. Please try again later.' });
    }
});

// Edit a subject (Update subject data)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { subName, subCode, sessions, sclassId, schoolId, teacherId } = req.body;

        const subject = await Subject.findByPk(id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Update subject data
        subject.subName = subName || subject.subName;
        subject.subCode = subCode || subject.subCode;
        subject.sessions = sessions || subject.sessions;
        subject.sclassId = sclassId || subject.sclassId;
        subject.schoolId = schoolId || subject.schoolId;
        subject.teacherId = teacherId || subject.teacherId;

        await subject.save();

        res.status(200).json(subject);
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({ message: 'Error updating subject. Please try again later.' });
    }
});

// Delete a subject
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const subject = await Subject.findByPk(id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        await subject.destroy();

        res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).json({ message: 'Error deleting subject. Please try again later.' });
    }
});

module.exports = router;
