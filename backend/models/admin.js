const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define(
  'Admin',
  {
    // Name field
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Field cannot be null
    },
    // Email field with a unique constraint
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Field cannot be null
      unique: true, // Ensures email is unique
    },
    // Password field
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Field cannot be null
    },
    // Role field with a default value
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Admin', // Default value set to 'Admin'
    },
    // School name field with a unique constraint
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false, // Field cannot be null
      unique: true, // Ensures schoolName is unique
    },
  },
  {
    tableName: 'admins', // Explicit table name in the database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = Admin;
