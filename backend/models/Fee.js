const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration

const Fee = sequelize.define('Fee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  index_number: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,  // Sequelize represents YEAR as INTEGER
    allowNull: false
  },
  month: {
    type: DataTypes.STRING, // This maps to VARCHAR in MySQL
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY, // Sequelize DATEONLY is used for date type in MySQL
    allowNull: false
  },
  paid: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  _status: {
    type: DataTypes.STRING, // This is mapped from VARCHAR(255)
    allowNull: false
  },
  student_status: {
    type: DataTypes.STRING, // Also mapped from VARCHAR(255)
    allowNull: false
  }
}, {
  tableName: 'Fees',
  timestamps: false // Disable automatic createdAt/updatedAt fields if not needed
});

module.exports = Fee;
