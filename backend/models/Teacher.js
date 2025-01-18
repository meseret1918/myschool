const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Teacher',
  },
  schoolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'admins',
      key: 'id',
    },
  },
  teachSubjectId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'subjects',
      key: 'id',
    },
  },
  teachSclassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sclasses',
      key: 'id',
    },
  },
  attendance: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'teachers',
  timestamps: true,
});

module.exports = Teacher;
