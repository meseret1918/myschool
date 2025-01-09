const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudentAttendance = sequelize.define('StudentAttendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  index_number: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  _status1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _status2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'student_attendance',
  timestamps: false,
});

module.exports = StudentAttendance;