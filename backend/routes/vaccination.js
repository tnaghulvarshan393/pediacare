const express = require('express');
const {
    saveVaccination,getVaccinationStatus, getVaccinationDetails ,updateVaccinationStatus } = require('../controllers/vaccination');

const router = express.Router();
router.post('/saveVaccination', saveVaccination); 
router.get('/getVacciStatus',getVaccinationStatus);
router.get('/getVaccinationDetails/:userId', getVaccinationDetails);
router.put('/vaccineStatus', updateVaccinationStatus);
module.exports = router;
