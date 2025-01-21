const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const Class = require('../models/classes');  
const Subject = require('../models/Subject');  
const cors = require('cors');

// Use CORS middleware (for development purposes, allow all origins)
router.use(cors());

// Dashboard route to get statistics
router.get('/', async (req, res) => {
  try {
    // Query to count how many parents have more than one student
    const parentsWithMultipleStudents = await Student.sequelize.query(`
      SELECT parent_id, COUNT(*) AS student_count
      FROM students
      GROUP BY parent_id
      HAVING COUNT(*) > 1
    `);

    // Query for total teachers, students, and parents
    const totalTeachers = await Teacher.count();
    const totalStudents = await Student.count();
    const totalParents = await Parent.count();

    // Query for total classes
    const totalClasses = await Class.count();

    // Query for total subjects
    const totalSubjects = await Subject.count();

    // Return the stats including the parents with more than one student, total classes, and total subjects
    res.json({
      totalTeachers,
      totalStudents,
      totalParents,
      parentsWithMultipleStudents: parentsWithMultipleStudents[0].length, // Get the count of parents with more than one student
      totalClasses, // Total Classes
      totalSubjects, // Total Subjects
    });
  } catch (err) {
    console.error('Error occurred while fetching data:', err);  // Enhanced logging for easier troubleshooting
    res.status(500).json({ message: 'Unable to fetch dashboard stats', error: err.message }); // Return the error message to the frontend
  }
});

module.exports = router;
