const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentName: { type: String, required: true },
  age: { type: Number, required: true },
  session: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  available: { type: Boolean, default: true },
  pId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Patient" }, // Ensure `pId` is referenced
  slot :{type:String, required:true},
});

module.exports = mongoose.model("Slot", SlotSchema);
