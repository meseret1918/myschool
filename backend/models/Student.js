const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming this is your sequelize instance

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set to current timestamp when creating a new record
        allowNull: false
    }
}, {
    tableName: 'students',
    timestamps: false // If you do not want Sequelize to manage the createdAt and updatedAt fields automatically
});

module.exports = Student;
