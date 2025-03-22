const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  slot: { type: String, required: true },
  name: { type: String, required: true },
  parentName: { type: String, required: true },
  age: { type: String, required: true },
  session: { type: String, required: true },
  service: { type: String, required: true },
  pId: { type: String, required: true },
  available: { type: Boolean, default: true },
  done:{type:Boolean,default:false},
  appId: { type: Number, required: true, unique: true }, // Ensure appId is of type Number and unique
});


slotSchema.index({ date: 1, slot: 1 }, { unique: true });

const SlotModel = mongoose.model('Slot', slotSchema);

module.exports = SlotModel;
