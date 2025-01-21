const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender_id',
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'recipient_id',
  },
  recipientRole: {
    type: DataTypes.ENUM('student', 'teacher', 'parent', 'admin'),
    allowNull: false,
    field: 'recipient_role',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'message',
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'sent_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false,
  tableName: 'messages',
});

Message.associate = (models) => {
  Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
  Message.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
};

module.exports = Message;
