// routes/medicineRoutes.js
const express = require('express');
const medicineController = require('../controllers/medicine');
const router = express.Router();

// Create a new medicine record
router.post('/addMedicine', medicineController.addMedicine);

// Fetch medicines for a specific patient by pId
router.get('/getMedicines', medicineController.getMedicines);

router.get('/getMedicinesById', medicineController.getMedicineByAppId);


// Update an existing medicine record by id
router.put('/updateMedicine/:appId', medicineController.updateMedicine);


// Delete a medicine record by id
router.delete('/deleteMedicine/:id', medicineController.deleteMedicine);

module.exports = router;
