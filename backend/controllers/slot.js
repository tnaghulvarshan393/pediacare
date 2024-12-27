const SlotModel = require('../models/slot');

const bookSlot = async (req, res) => {
  const { date, slot, name, parentName, age, session, service, pId } = req.body;

  try {
    const existingSlot = await SlotModel.findOne({ date, slot });
    if (existingSlot) {
      return res.status(400).json({
        error: "Slot already booked",
        details: "The selected date and time slot is unavailable.",
      });
    }
    const newSlot = new SlotModel({
      date,
      slot,
      name,
      parentName,
      age,
      session,
      service,
      pId,
      available: false, 
    });

    await newSlot.save();

    return res.status(201).json({
      message: "Slot booked successfully",
      slot: newSlot,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const checkSlotAvailability = async (req, res) => {
  const { date, slot } = req.query;

  try {
    const existingSlot = await SlotModel.findOne({ date, slot });

    if (existingSlot) {
      return res.status(200).json({
        available: false,
        message: "The slot is already booked.",
      });
    }

    return res.status(200).json({
      available: true,
      message: "The slot is available for booking.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const bookedSlots = await SlotModel.find({ available: false });

    return res.status(200).json(bookedSlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = {
  bookSlot,
  checkSlotAvailability,
  getBookedSlots,
};
