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
            model: 'users', // Matches the table name in the User model
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Matches the table name in the User model
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

// Define associations
Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    Message.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
};

module.exports = Message;
