const express = require('express');
const router = express.Router();
const PatientModel = require('../models/patient'); // Assuming you have the Patient model in the models folder
const { signup,login,updatePatient ,getPatientDetails} = require('../controllers/patient');

// POST Route for Signup
router.post('/signup', signup);

// POST Route for 
router.post('/login', login);  // This should match the endpoint you're hitting
router.get('/getPatient',getPatientDetails);
// Update patient details API

// PUT Route for updating patient details by ID
router.put('/updatePatient/:id', updatePatient);




  


module.exports = router;
