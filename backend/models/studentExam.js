const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const StudentExam = sequelize.define('StudentExam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    index_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    grade_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    marks: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = StudentExam;