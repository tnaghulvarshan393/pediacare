const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: {type:String, required:true},
  name: {type:String, required:true},
  
});

const PatientModel = mongoose.model('Patient', PatientSchema); // Ensure the collection name is 'patients'

module.exports = PatientModel;
