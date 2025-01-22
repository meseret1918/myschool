const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const Class = require('../models/classes');  
const Subject = require('../models/Subject');  
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

router.use(cors(corsOptions));

router.get('/', async (req, res) => {
  try {
    const parentsWithMultipleStudents = await Student.sequelize.query(`
      SELECT parent_id, COUNT(*) AS student_count
      FROM students
      GROUP BY parent_id
      HAVING COUNT(*) > 1
    `);

    const totalTeachers = await Teacher.count();
    const totalStudents = await Student.count();
    const totalParents = await Parent.count();
    const totalClasses = await Class.count();
    const totalSubjects = await Subject.count();

    res.json({
      totalTeachers,
      totalStudents,
      totalParents,
      parentsWithMultipleStudents: parentsWithMultipleStudents[0].length,
      totalClasses,
      totalSubjects,
    });
  } catch (err) {
    console.error('Error occurred while fetching data:', err);
    res.status(500).json({ message: 'Unable to fetch dashboard stats', error: err.message });
  }
});

module.exports = router;