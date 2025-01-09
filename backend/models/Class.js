const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the 'Class' model
const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'classes',  // Specifies the table name (optional, as Sequelize will pluralize by default)
    timestamps: false,     // Disable the automatic timestamp fields (createdAt, updatedAt)
});

module.exports = Class;
