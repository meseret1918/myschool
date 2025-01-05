const Teacher = require('../models/Teacher'); // Sequelize model

// Create a new teacher
exports.createTeacher = async (req, res) => {
    const { FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Qualification, ExperienceYears, HireDate, SubjectsTaught, Salary } = req.body;

    // Validate required fields
    if (!FirstName || !LastName || !Email || !DateOfBirth || !Salary) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const teacher = await Teacher.create({
            FirstName,
            LastName,
            DateOfBirth,
            Gender,
            ContactNumber,
            Email,
            Qualification,
            ExperienceYears,
            HireDate,
            SubjectsTaught,
            Salary
        });
        res.status(201).json({ message: 'Teacher created successfully', teacher });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error creating teacher', error: err.message });
    }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        if (teachers.length === 0) {
            return res.status(404).json({ message: 'No teachers found' });
        }
        res.status(200).json(teachers);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error fetching teachers', error: err.message });
    }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacher = await Teacher.findByPk(teacherId); // Using findByPk for Primary Key search
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error fetching teacher', error: err.message });
    }
};

// Update teacher details
exports.updateTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const { FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Qualification, ExperienceYears, HireDate, SubjectsTaught, Salary } = req.body;

    // Validate required fields
    if (!FirstName || !LastName || !Email || !DateOfBirth || !Salary) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [updated] = await Teacher.update(
            { 
                FirstName, 
                LastName, 
                DateOfBirth, 
                Gender, 
                ContactNumber, 
                Email, 
                Qualification, 
                ExperienceYears, 
                HireDate, 
                SubjectsTaught, 
                Salary 
            },
            {
                where: { TeacherID: teacherId }, // Matching the teacher by ID
                returning: true, // To return the updated object
                plain: true // Ensures the returned value is a plain object
            }
        );

        if (!updated) { // 'updated' will be 0 if no rows were affected
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Fetch the updated teacher details to send in response
        const updatedTeacher = await Teacher.findByPk(teacherId);
        res.status(200).json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error updating teacher', error: err.message });
    }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const deleted = await Teacher.destroy({
            where: { TeacherID: teacherId }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error deleting teacher', error: err.message });
    }
};
