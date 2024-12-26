
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: {type:String, required:true},
  name: {type:String, required:true},
  dob:{type:String },   
  gender:{type:String },   
  height:{type:String },
  weight:{type:String},
  address:{type:String},
  fatherName:{type:String},
  motherName:{type:String},


  
});
const PatientModel = mongoose.model('Patient', PatientSchema); // Ensure the collection name is 'patients'

module.exports = PatientModel;
