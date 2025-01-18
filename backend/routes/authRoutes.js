const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Import login controller

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);  // Define the login route

module.exports = router;
