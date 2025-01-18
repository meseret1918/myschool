const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the configured Sequelize instance

// Define the Notice model
const Notice = sequelize.define('Notice', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
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
  tableName: 'notices', // Explicitly define the table name
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Notice;
