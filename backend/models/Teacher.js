const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your Sequelize configuration

const Teacher = sequelize.define('Teacher', {
    TeacherID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "First Name is required" }
        }
    },
    LastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Last Name is required" }
        }
    },
    Gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Gender is required" }
        }
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Age must be a valid number" },
            min: { args: [0], msg: "Age must be at least 0" }
        }
    },
    ContactNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Contact Number is required" },
            len: { args: [10, 15], msg: "Contact Number must be between 10 and 15 characters" }
        }
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Please provide a valid email address" }
        }
    },
    Qualification: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Qualification is required" }
        }
    },
    ExperienceYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Experience Years must be a valid number" },
            min: { args: [0], msg: "Experience Years cannot be less than 0" }
        }
    },
    HireDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: { msg: "Hire Date must be a valid date" }
        }
    },
    SubjectsTaught: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Subjects Taught is required" }
        }
    },
    Salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: { msg: "Salary must be a valid number with two decimal points" },
            min: { args: [0], msg: "Salary must be at least 0" }
        }
    },
}, {
    tableName: 'teachers',
    timestamps: false, // Since created_at and updated_at are not in your table
});

module.exports = Teacher;
