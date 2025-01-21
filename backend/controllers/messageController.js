const { Sequelize } = require('sequelize');
const Message = require('../models/Message');
const User = require('../models/User');

// Send a new message
exports.sendMessage = async (req, res) => {
  const { senderId, recipient, message, recipientRole } = req.body;

  if (!senderId || !recipient || !message || !recipientRole) {
    return res.status(400).json({ message: 'Sender, recipient, message content, and recipient role are required' });
  }

  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findOne({ where: { id: recipient } });

    if (!sender) {
      console.error(`Sender with ID ${senderId} not found`);
      return res.status(404).json({ message: 'Sender not found' });
    }

    if (!receiver) {
      console.error(`Recipient with ID ${recipient} not found`);
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const newMessage = await Message.create({
      senderId: sender.id,
      recipientId: receiver.id,
      recipientRole,
      content: message,
    });

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (err) {
    console.error('Error while sending message:', err);
    res.status(500).json({ message: 'Error sending message', error: err.message });
  }
};

// Get all messages for a user
exports.getMessages = async (req, res) => {
  const userId = req.params.userId;

  try {
    const messages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ],
    });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }

    res.status(200).json({ data: messages });
  } catch (err) {
    console.error('Error while fetching messages:', err);
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
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
  } catch (err) {
    console.error('Error while deleting message:', err);
    res.status(500).json({ message: 'Error deleting message', error: err.message });
  }
};
