const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Parent = sequelize.define('Parent', {
    parent_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),  
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name is required'
            },
            len: {
                args: [1, 100],
                msg: 'Name must be between 1 and 100 characters'
            }
        }
    },
    phone: {
        type: DataTypes.STRING(15),  
        allowNull: true,
        validate: {
            len: {
                args: [10, 15], 
                msg: 'Phone number should be between 10 and 15 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: 'Email must be unique'
        },
        validate: {
            isEmail: {
                msg: 'Invalid email format'
            },
            notEmpty: {
                msg: 'Email is required'
            }
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'parents',
    timestamps: false,     
});

module.exports = Parent;
