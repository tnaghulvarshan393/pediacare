const mongoose = require('mongoose');

const VaccinationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ID to associate data with a specific user
  vaccination: [
    {
      vacciname: { type: String, required: true },  // Vaccine name
      dose: { type: String, required: true },      // Dose details
      age: { type: String, required: true },       // Age at which vaccine is given
      availability: { type: Boolean, required: true } // Whether the vaccine is available or not
    }
  ]
});

const VaccinationModel = mongoose.model('Vaccination', VaccinationSchema);

module.exports = VaccinationModel;

