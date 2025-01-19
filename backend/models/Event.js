const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust according to your setup

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
    allowNull: true // Since description is nullable
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false // Since date is not nullable
  }
}, {
  tableName: 'events', // Specify the table name
  timestamps: false // If your table doesn't include 'createdAt' and 'updatedAt' fields
});

module.exports = Event;
