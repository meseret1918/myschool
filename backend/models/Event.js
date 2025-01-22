const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: true // Since title is nullable
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true 
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false 
  }
}, {
  tableName: 'events', 
  timestamps: false 
});

module.exports = Event;
