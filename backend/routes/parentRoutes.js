const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const authMiddleware = require('../utils/authMiddleware');

// Create a new parent
router.post('/', authMiddleware.verifyAdmin, parentController.createParent);

// Get all parents
router.get('/', authMiddleware.verifyAdmin, parentController.getAllParents);

// Get a parent by ID
router.get('/:parentId', authMiddleware.verifyAdmin, parentController.getParentById);

// Update parent details
router.put('/:parentId', authMiddleware.verifyAdmin, parentController.updateParent);

// Delete parent
router.delete('/:parentId', authMiddleware.verifyAdmin, parentController.deleteParent);

module.exports = router;
