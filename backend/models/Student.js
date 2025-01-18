const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the configured Sequelize instance

// Define the Student model
const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rollNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sclassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sclasses', // Reference to the sclasses table
      key: 'id',
    },
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'admins', // Reference to the admins table
      key: 'id',
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Student',
  },
  examResult: {
    type: DataTypes.JSON, // Stores exam results as a JSON object
    allowNull: true,
  },
  attendance: {
    type: DataTypes.JSON, // Stores attendance records as a JSON object
    allowNull: true,
  },
}, {
  tableName: 'students', // Explicitly specify the table name
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Student;
