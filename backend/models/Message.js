const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender_id',
  },
  recipient_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'recipient_id',
  },
  recipient_role: {
    type: DataTypes.ENUM('student', 'teacher', 'parent', 'admin'),
    allowNull: false,
    field: 'recipient_role',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'message',
  },
  sent_at: {
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
  Message.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
  Message.belongsTo(models.User, { foreignKey: 'recipient_id', as: 'recipient' });
};

module.exports = Message;