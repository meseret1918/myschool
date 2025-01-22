const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
    type: DataTypes.INTEGER,  
    allowNull: false
  },
  month: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  paid: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  _status: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  student_status: {
    type: DataTypes.STRING, 
    allowNull: false
  }
}, {
  tableName: 'Fees',
  timestamps: false 
});

module.exports = Fee;
