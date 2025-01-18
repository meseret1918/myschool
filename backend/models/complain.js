const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the configured Sequelize instance

// Define the Complain model
const Complain = sequelize.define('Complain', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students', // Reference to the students table
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  complaint: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'admins', // Reference to the admins table
      key: 'id',
    },
  },
}, {
  tableName: 'complaints', // Explicitly define the table name
  timestamps: false, // Disable automatic createdAt and updatedAt fields
});

module.exports = Complain;
