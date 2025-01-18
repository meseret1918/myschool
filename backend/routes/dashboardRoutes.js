const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parent = require('../models/Parent');

// Dashboard route to get statistics
router.get('/', async (req, res) => {
  try {
    const totalTeachers = await Teacher.count();
    const totalStudents = await Student.count();
    const totalParents = await Parent.count();

    res.json({
      totalTeachers,
      totalStudents,
      totalParents
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch dashboard stats' });
  }
});

module.exports = router;
