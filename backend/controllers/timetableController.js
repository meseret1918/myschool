const Timetable = require('../models/Timetable');  // Import the Timetable model

// Get all timetables
exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.findAll();
        res.status(200).json(timetables);
    } catch (error) {
        console.error('Error fetching timetables:', error);
        res.status(500).json({ error: 'Failed to fetch timetables' });
    }
};

// Get a timetable by ID
exports.getTimetableById = async (req, res) => {
    try {
        const { id } = req.params;
        const timetable = await Timetable.findByPk(id);

        if (!timetable) {
            return res.status(404).json({ error: 'Timetable not found' });
        }

        res.status(200).json(timetable);
    } catch (error) {
        console.error('Error fetching timetable:', error);
        res.status(500).json({ error: 'Failed to fetch timetable' });
    }
};

// Add a new timetable
exports.addTimetable = async (req, res) => {
    try {
        const { day, start_time, end_time, subject, teacher_id, class_id } = req.body;

        // Validate input
        if (!day || !start_time || !end_time || !subject || !teacher_id || !class_id) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newTimetable = await Timetable.create({
            day,
            start_time,
            end_time,
            subject,
            teacher_id,
            class_id,
        });

        res.status(201).json({
            message: 'Timetable added successfully',
            timetable: newTimetable,
        });
    } catch (error) {
        console.error('Error adding timetable:', error);
        res.status(500).json({ error: 'Error adding timetable. Please try again.' });
    }
};

// Update an existing timetable
exports.updateTimetable = async (req, res) => {
    try {
        const { id } = req.params;
        const { day, start_time, end_time, subject, teacher_id, class_id } = req.body;

        const timetable = await Timetable.findByPk(id);

        if (!timetable) {
            return res.status(404).json({ error: 'Timetable not found' });
        }

        timetable.day = day || timetable.day;
        timetable.start_time = start_time || timetable.start_time;
        timetable.end_time = end_time || timetable.end_time;
        timetable.subject = subject || timetable.subject;
        timetable.teacher_id = teacher_id || timetable.teacher_id;
        timetable.class_id = class_id || timetable.class_id;

        await timetable.save();

        res.status(200).json({
            message: 'Timetable updated successfully',
            timetable,
        });
    } catch (error) {
        console.error('Error updating timetable:', error);
        res.status(500).json({ error: 'Error updating timetable' });
    }
};

// Delete a timetable
exports.deleteTimetable = async (req, res) => {
    try {
        const { id } = req.params;

        const timetable = await Timetable.findByPk(id);

        if (!timetable) {
            return res.status(404).json({ error: 'Timetable not found' });
        }

        await timetable.destroy();

        res.status(200).json({
            message: 'Timetable deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting timetable:', error);
        res.status(500).json({ error: 'Error deleting timetable' });
    }
};
