
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const Timetable = sequelize.define('Timetable', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Timetable;
