const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the User model
const User = sequelize.define('User', {
    username: {
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
}, {
    tableName: 'users',  // Table name in MySQL
    timestamps: false,   // Disable createdAt and updatedAt fields
});

// Sync the model with the database (only do this once in the application)
sequelize.sync()
    .then(() => {
        console.log('Users table has been created.');
    })
    .catch(error => {
        console.error('Unable to create table:', error);
    });

module.exports = User;
