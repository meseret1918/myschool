const express = require('express');
const router = express.Router();
const feeController = require('../controllers/FeeController'); 

// GET all fees
router.get('/', feeController.getAllFee);

// GET fee by ID
router.get('/:id', feeController.getFeeById);

// POST a new fee
router.post('/', feeController.addFee);

// PUT to update fee by ID
router.put('/:id', feeController.updateFee);

// DELETE fee
router.delete('/:id', feeController.deleteFee);

module.exports = router;
