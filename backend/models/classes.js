const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Classes = sequelize.define('Classes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  class_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'classes',
  timestamps: false,
});

module.exports = Classes;
