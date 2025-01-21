const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sessions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sclassId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schoolId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
        allowNull: false
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'subjects',
    timestamps: true // If your table handles timestamps for createdAt and updatedAt
});

module.exports = Subject;
