const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/db'); 

const attendance = sequelize.define('attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    index_number: {
        type: DataTypes.BIGINT, // Should match your table definition
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY, // Correctly using DATEONLY for date without time
        allowNull: false
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER, // Use INTEGER instead of STRING if it's numeric
        allowNull: false
    },
    time: {
        type: DataTypes.TIME, // Correct datatype for time
        allowNull: false
    },
    status1: {
        type: DataTypes.ENUM('Present', 'Absent', 'Late', 'On Time'),
        allowNull: false
    },
    status2: {
        type: DataTypes.ENUM('Excused', 'Partial Attendance', 'Late but Present', 'Other Notes'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, // Ensure it's properly defined as DATE or TIMESTAMP
        defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE, // Ensure it's properly defined
        defaultValue: DataTypes.NOW, // Automatically sets the current timestamp on update
        allowNull: false
    }
}, {
    tableName: 'attendances', // Table name is plural, so make sure this matches the DB
    timestamps: true // Use Sequelize's default behavior to manage `createdAt` and `updatedAt`
});

module.exports = attendance;
