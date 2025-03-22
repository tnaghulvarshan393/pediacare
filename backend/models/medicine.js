const mongoose = require('mongoose');

const medicineItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
  session: [{ type: String, enum: ['morning', 'afternoon', 'night'], required: true }],
  meal: { type: String, enum: ['before', 'after'], required: true },
  days: { type: Number, required: true },
});

const medicineSchema = new mongoose.Schema({
  appId: { type: String, required: true },
  medicines: [medicineItemSchema],
  pId: { type: String, required: true },
});

const medicineModel = mongoose.model('Medicine', medicineSchema);

module.exports = medicineModel;

