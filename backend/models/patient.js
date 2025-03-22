const mongoose = require('mongoose');

// Counter Schema to track patientNo
const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

// Model for the counter
const CounterModel = mongoose.model('Counter', CounterSchema);

// Patient Schema
const PatientSchema = new mongoose.Schema({
  patientNo: { type: Number, unique: true }, // Auto-incrementing patient number
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  dob: { type: String },
  gender: { type: String },
  height: { type: String },
  weight: { type: String },
  address: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
});

const PatientModel = mongoose.model('Patient', PatientSchema);

module.exports = { PatientModel, CounterModel };
