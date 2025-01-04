// routes/dashboardRoutes.js
const express = require('express');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parent = require('../models/Parent');

const router = express.Router();

// Get Dashboard Stats (Teacher, Student, Parent count)
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalTeachers = await Teacher.count();
    const totalStudents = await Student.count();
    const totalParents = await Parent.count();

    res.json({
      totalTeachers,
      totalStudents,
      totalParents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch dashboard stats' });
  }
});

module.exports = router;
