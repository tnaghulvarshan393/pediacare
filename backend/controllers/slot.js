const mongoose = require('mongoose'); 
const SlotModel = require('../models/slot');

const getSlots = async (req, res) => {
    const { date } = req.query;
    const parsedDate = new Date(date);

    console.log("Date Query Parameter:", date); // Debugging
    console.log("Parsed Date:", parsedDate); // Debugging

    if (!date || isNaN(parsedDate)) {
        console.log("Invalid or missing date parameter."); // Debugging
        return res.status(400).json({ error: 'Invalid or missing date parameter' });
    }

    const startOfDay = new Date(parsedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        // Fetch slots for the specific date
        const slots = await SlotModel.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        // Map the fetched slots to match the expected format
        const formattedSlots = slots.map((slot) => ({
            time: slot.slot,        // Assuming 'slot' in the model contains the time string
            bookedBy: slot.bookedBy // Assuming 'bookedBy' is either userId or null
        }));

        console.log("Formatted Slots:", formattedSlots); // Debugging

        res.status(200).json({ slots: formattedSlots });
    } catch (error) {
        console.error("Error fetching slots:", error); // Debugging
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
};


const bookSlot = async (req, res) => {
    console.log("Received data:", req.body);  // Log the received request body
  
    const { name, parentName, age, session, service, date, pId, slot } = req.body;
  
    try {
      // Convert pId to ObjectId using 'new'
      const patientId = new mongoose.Types.ObjectId(pId);
  
      console.log("Booking Slot Data: ", { date, slot, pId: patientId });
  
      // Ensure that the date is in the correct format for comparison
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);  // Reset to the start of the day (midnight)
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);  // Set to the end of the day (just before midnight)
  
      console.log("Start of day:", startOfDay);
      console.log("End of day:", endOfDay);
  
      // Check if the slot is available first (ensure it is within the correct date range)
      const availableSlot = await SlotModel.findOne({
        date: { $gte: startOfDay, $lte: endOfDay }, // Date range check for the whole day
        slot,
        available: true
      });
  
      console.log("Available Slot: ", availableSlot);
  
      if (!availableSlot) {
        return res.status(400).json({ error: 'Slot already booked or unavailable' });
      }
  
      // Book the slot by updating it
      const existingSlot = await SlotModel.findOneAndUpdate(
        { date: { $gte: startOfDay, $lte: endOfDay }, slot, available: true }, // Ensure slot is available
        {
          $set: {
            name,
            parentName,
            age,
            session,
            service,
            pId: patientId,
            available: false
          }
        },
        { new: true }
      );
  
      console.log("Booked Slot: ", existingSlot);
  
      if (!existingSlot) {
        return res.status(400).json({ error: 'Slot already booked or unavailable' });
      }
  
      res.status(201).json(existingSlot);
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ error: 'Failed to book slot', details: error.message });
    }
  };
  
   

module.exports = { getSlots, bookSlot };
