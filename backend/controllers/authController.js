const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust import as needed
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      username: email.split('@')[0], // Extract username from email
    });

    return res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'An error occurred during registration. Please try again.' });
  }
};
