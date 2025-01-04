const Message = require('../models/Message');
const User = require('../models/User'); // Assuming you have a User model for reference

// Create a new message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    // Input validation
    if (!senderId || !receiverId || !content) {
        return res.status(400).json({ message: 'Sender, receiver, and content are required' });
    }

    try {
        // Optionally: Check if both sender and receiver exist in the database
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        
        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }

        const message = new Message({ senderId, receiverId, content });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Error sending message' });
    }
};

// Get all messages for a user
exports.getMessages = async (req, res) => {
    const { userId } = req.params;

    try {
        const messages = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this user' });
        }
        res.status(200).json(messages);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Authorization: Ensure the logged-in user is the sender or an admin
        if (req.user.id !== message.senderId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to delete this message' });
        }

        // Delete the message
        await message.remove();
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Error deleting message' });
    }
};
