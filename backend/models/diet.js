const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  patientNo: { type: String, required: true },
  breakfast: { type: [String], default: [] },
  morningSnack: { type: [String], default: [] },
  lunch: { type: [String], default: [] },
  eveningSnack: { type: [String], default: [] },
  dinner: { type: [String], default: [] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Diet", dietSchema);
