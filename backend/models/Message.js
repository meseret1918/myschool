const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the Message model
const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    recipientRole: {
        type: DataTypes.ENUM('student', 'teacher', 'parent', 'admin'),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Message content cannot be empty' },
        },
    },
    sentAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'messages',
    timestamps: false,
});

// Sync the model with the database
sequelize.sync({ alter: true }) // Using `alter: true` to apply changes without dropping the table
    .then(() => {
        console.log('Messages table has been synchronized.');
    })
    .catch((error) => {
        console.error('Unable to synchronize table:', error);
    });

// Define associations if needed
Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    Message.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
};

module.exports = Message;
