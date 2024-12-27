const Message = require('../models/Message');

// Create a new message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const message = new Message({ senderId, receiverId, content });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (err) {
        res.status(500).json({ message: 'Error sending message' });
    }
};

// Get all messages for a user
exports.getMessages = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

// Delete message
exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await Message.findByIdAndDelete(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting message' });
    }
};
