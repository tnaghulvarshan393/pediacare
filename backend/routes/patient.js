const express = require('express');
const router = express.Router();
const PatientModel = require('../models/patient'); // Assuming you have the Patient model in the models folder
const { signup,login } = require('../controllers/patient');

// POST Route for Signup
router.post('/signup', signup);

// POST Route for 
router.post('/login', login);  // This should match the endpoint you're hitting



module.exports = router;
