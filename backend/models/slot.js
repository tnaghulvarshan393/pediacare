const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  pId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

slotSchema.index({ date: 1, slot: 1 }, { unique: true });

const SlotModel = mongoose.model('Slot', slotSchema);

module.exports = SlotModel;
