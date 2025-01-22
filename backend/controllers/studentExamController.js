const Exam = require('../models/studentExam');

// Get all exams
exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.findAll();
        res.status(200).json(exams);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
};

// Get exam by ID
exports.getExamById = async (req, res) => {
    const { id } = req.params;
    try {
        const exam = await Exam.findByPk(id);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch exam' });
    }
};

// Create a new exam
exports.createExam = async (req, res) => {
    const { index_number, grade_id, exam_id, subject_id, marks, year, date } = req.body;

    if (!index_number || !grade_id || !exam_id || !subject_id || !marks || !year || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newExam = await Exam.create({
            index_number,
            grade_id,
            exam_id,
            subject_id,
            marks,
            year,
            date
        });
        res.status(201).json(newExam);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create exam' });
    }
};

// Update exam
exports.updateExam = async (req, res) => {
    const { id } = req.params;
    const { index_number, grade_id, exam_id, subject_id, marks, year, date } = req.body;

    try {
        const exam = await Exam.findByPk(id);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        exam.index_number = index_number ?? exam.index_number;
        exam.grade_id = grade_id ?? exam.grade_id;
        exam.exam_id = exam_id ?? exam.exam_id;
        exam.subject_id = subject_id ?? exam.subject_id;
        exam.marks = marks ?? exam.marks;
        exam.year = year ?? exam.year;
        exam.date = date ?? exam.date;

        await exam.save();
        res.status(200).json(exam);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update exam' });
    }
};

// Delete exam
exports.deleteExam = async (req, res) => {
    const { id } = req.params;

    try {
        const exam = await Exam.findByPk(id);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        await exam.destroy();
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete exam' });
    }
};
