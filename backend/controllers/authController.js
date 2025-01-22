const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Fallback JWT secret in case environment variable is not set
const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey1234567890';

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
      username: email.split('@')[0], 
    });

    return res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'An error occurred during registration. Please try again.' });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token (optional)
    const token = jwt.sign(
      { userId: user.id, role: user.role },  // Include userId and role
      JWT_SECRET,                           // Use the secret stored in environment variables or fallback secret
      { expiresIn: '1h' }                  // Token expiration time
    );

    // Respond with the user data and token
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,  // Send the token back to the client
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
};
