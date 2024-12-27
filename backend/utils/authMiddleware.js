const jwt = require('jsonwebtoken');
const db = require('../db'); // Database connection

// Secret key for JWT (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify if the user is authenticated (logged in)
const verifyAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and extract user information
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch user from the database
        db.query('SELECT * FROM users WHERE id = ?', [decoded.userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            const user = results[0];

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to check if the user has admin privileges
const verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch user from the database
        db.query('SELECT * FROM users WHERE id = ?', [decoded.userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            const user = results[0];

            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied: Admins only' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { verifyAuthenticated, verifyAdmin };
