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
    },
    LastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ContactNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    Qualification: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ExperienceYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    HireDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    SubjectsTaught: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'teachers',
    timestamps: false, // Since created_at and updated_at are not in your table
});

module.exports = Teacher;
