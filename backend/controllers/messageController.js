const { Sequelize } = require('sequelize');
const Message = require('../models/Message');
const User = require('../models/User');

// Send a new message
exports.sendMessage = async (req, res) => {
  const { senderId, recipientId, recipientRole, message } = req.body;

  if (!senderId || !recipientId || !recipientRole || !message) {
    return res.status(400).json({ message: 'Sender ID, recipient ID, recipient role, and message content are required' });
  }

  try {
    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);

    if (!sender) {
      return res.status(404).json({ message: `Sender with ID ${senderId} not found` });
    }

    if (!recipient) {
      return res.status(404).json({ message: `Recipient with ID ${recipientId} not found` });
    }

    const newMessage = await Message.create({
      sender_id: sender.id,
      recipient_id: recipient.id,
      recipient_role: recipientRole,
      message,
    });

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error while sending message:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Get all messages for a user
exports.getMessages = async (req, res) => {
  const userId = req.params.userId;

  try {
    const messages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [
          { sender_id: userId },
          { recipient_id: userId },
        ],
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'recipient', attributes: ['id', 'username', 'email'] },
      ],
    });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.status(200).json({ data: messages });
  } catch (error) {
    console.error('Error while fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};
// Delete a message
exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.destroy();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error while deleting message:', error);
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};