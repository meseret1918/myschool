const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the configured Sequelize instance

// Define the SClass model
const SClass = sequelize.define('SClass', {
  sclassName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'admins', // Reference to the admins table
      key: 'id',
    },
  },
}, {
  tableName: 'sclasses', // Explicitly define the table name
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = SClass;
