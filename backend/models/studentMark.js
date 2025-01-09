const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudentMark = sequelize.define('StudentMark', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'students',  // Assuming you have a students table
      key: 'id',
    },
  },
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exam_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'marks',
  timestamps: false,  // Assuming there are no timestamps in your table
});

module.exports = StudentMark;
