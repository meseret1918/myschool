const Teacher = require('../models/Teacher');

// Create a new teacher
exports.createTeacher = async (req, res) => {
    const { name, subject, grade, email } = req.body;
    try {
        const teacher = new Teacher({ name, subject, grade, email });
        await teacher.save();
        res.status(201).json({ message: 'Teacher created successfully', teacher });
    } catch (err) {
        res.status(500).json({ message: 'Error creating teacher', error: err.message });
    }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teachers', error: err.message });
    }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher', error: err.message });
    }
};

// Update teacher details
exports.updateTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const { name, subject, grade, email } = req.body;
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            teacherId, 
            { name, subject, grade, email }, 
            { new: true }
        );
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher updated successfully', teacher });
    } catch (err) {
        res.status(500).json({ message: 'Error updating teacher', error: err.message });
    }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacher = await Teacher.findByIdAndDelete(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting teacher', error: err.message });
    }
};