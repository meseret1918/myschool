const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin Registration
const adminRegister = async (req, res) => {
  try {
    const { email, schoolName, password } = req.body;

    // Validate request body
    if (!email || !schoolName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if admin already exists by email or school name
    const existingAdminByEmail = await Admin.findOne({ where: { email } });
    const existingSchool = await Admin.findOne({ where: { schoolName } });

    if (existingAdminByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (existingSchool) {
      return res.status(400).json({ message: 'School name already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await Admin.create({
      email,
      schoolName,
      password: hashedPassword,
    });

    // Hide password in response
    admin.password = undefined;

    return res.status(201).json({ message: 'Registration successful', admin });
  } catch (err) {
    console.error('Error during admin registration:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

// Admin Login
const adminLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, 'yourSecretKey', { expiresIn: '1h' });

    // Hide password in response
    admin.password = undefined;

    return res.status(200).json({ message: 'Login successful', token, admin });
  } catch (err) {
    console.error('Error during admin login:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get Admin Details
const getAdminDetail = async (req, res) => {
  try {
    const adminId = req.params.id;

    // Fetch admin by primary key
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'No admin found' });
    }

    // Hide password in response
    admin.password = undefined;

    return res.status(200).json(admin);
  } catch (err) {
    console.error('Error fetching admin details:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = { adminRegister, adminLogIn, getAdminDetail };
