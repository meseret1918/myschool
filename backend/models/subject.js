const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('Subject', {
  subName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sessions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sclassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sclasses',
      key: 'id',
    },
  },
  schoolId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'admins',
      key: 'id',
    },
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teachers',
      key: 'id',
    },
  },
}, {
  tableName: 'subjects',
  timestamps: true,
});

module.exports = Subject;
