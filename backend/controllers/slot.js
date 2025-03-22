const SlotModel = require("../models/slot");

// AM and PM slots
const SlotAm = [
  "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", 
  "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", 
  "11:00", "11:15"
];

const SlotPm = [
  "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", 
  "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", 
  "19:00", "19:15", "19:30", "19:45"
];


// Book a slot

// Check slot availability
// Backend: Updated Response for checkSlotAvailability
// Check slot availability
// Check slot availability
// Check slot availability
const checkSlotAvailability = async (req, res) => {
  const { date, session } = req.query;

  if (!date || !session) {
    return res.status(400).json({ error: "Date and session are required." });
  }

  console.log(`Received date: ${date}, session: ${session}`);  // Log received date

  // Define slots based on the session
  const allSlots = session === "Morning" ? SlotAm : SlotPm;

  try {
    // Fetch all booked slots for the given date and session
    const bookedSlots = await SlotModel.find({ date, available: false }).distinct("slot");

    console.log("Booked Slots:", bookedSlots);

    // Normalize the booked slots for comparison
    const normalizedBookedSlots = bookedSlots.map((slot) => slot.trim().padStart(5, '0'));

    // Filter out booked slots from all slots
    const availableSlots = allSlots.filter(
      (slot) => !normalizedBookedSlots.includes(slot.trim().padStart(5, '0'))
    );

    return res.status(200).json({
      available: availableSlots.length > 0,
      slots: availableSlots,
      bookedSlots: normalizedBookedSlots,  // Returning booked slots
    });
  } catch (error) {
    console.error("Error in checkSlotAvailability:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const bookSlot = async (req, res) => {
  console.log("Request data:", req.body);

  const { date, slot, name, parentName, age, session, service, pId } = req.body;

  if (!date || !slot || !name || !parentName || !age || !session || !service || !pId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const trimmedSlot = slot.trim().padStart(5, "0"); // Normalize slot format

  try {
    // Check if service is "Emergency"
    if (service !== "Emergency") {
      // For services other than Emergency, check if the slot is already booked
      const existingSlot = await SlotModel.findOne({ date, slot: trimmedSlot });
      if (existingSlot) {
        return res.status(400).json({
          error: "Slot already booked",
          details: "The selected date and time slot is unavailable.",
        });
      }
    }

    // Get the last used appId or start from 1 if no slots exist
    const lastSlot = await SlotModel.findOne().sort({ appId: -1 }); // Sort by appId in descending order
    let newAppId = lastSlot ? lastSlot.appId + 1 : 1; // If no last slot, start appId from 1

    console.log("Last slot appId:", lastSlot ? lastSlot.appId : "No previous slot");
    console.log("Calculated new appId:", newAppId);

    // Ensure newAppId is a valid number
    if (isNaN(newAppId)) {
      console.error("Invalid appId value:", newAppId);
      return res.status(500).json({ error: "Invalid appId value" });
    }

    // Create new slot with the incremented appId
    const newSlot = new SlotModel({
      date,
      slot: service === "Emergency" ? "0:00" : trimmedSlot, // Set slot as "0:00" for Emergency
      name,
      parentName,
      age,
      session,
      service,
      pId,
      available: false,
      appId: newAppId, // Set the new appId
    });

    await newSlot.save();
    return res.status(201).json({
      message: "Slot booked successfully",
      slot: newSlot,
    });
  } catch (error) {
    console.error("Error booking slot:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message, // Provide more error details in the response
    });
  }
};


// Get all booked slots for a specific date
const getBookedSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date query parameter is required" });
  }

  try {
    // Parse the provided date and define start and end of the day
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Query for slots within the day
    const bookedSlots = await SlotModel.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return res.status(200).json(bookedSlots);
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

// Clean up slot data (normalize slot format)
const normalizeSlotData = async () => {
  try {
    const slots = await SlotModel.find({});
    for (const slot of slots) {
      const trimmedSlot = slot.slot.trim().padStart(5, '0'); // Ensure consistent format (e.g., "06:00")

      if (slot.slot !== trimmedSlot) {
        slot.slot = trimmedSlot;
      }

      // Ensure appId is assigned
      if (!slot.appId || isNaN(slot.appId)) {
        const lastSlot = await SlotModel.findOne().sort({ appId: -1 }); // Get last slot by appId
        let newAppId = lastSlot ? lastSlot.appId + 1 : 1; // Assign new appId or start from 1

        // Ensure newAppId is a valid number
        if (isNaN(newAppId)) {
          console.error("Calculated appId is NaN, skipping this slot.");
          continue; // Skip this slot if appId is invalid
        }

        console.log(`Assigning appId ${newAppId} for slot ${slot.slot}`);
        slot.appId = newAppId;
      }

      await slot.save();
    }
    console.log("Database slots normalized successfully.");
  } catch (error) {
    console.error("Error normalizing the database:", error);
  }
};
normalizeSlotData();

const getRecentSlot = async (req, res) => {
  const { pId } = req.query; // Get patient ID from query parameters

  if (!pId) {
    return res.status(400).json({ error: "pId is required." });
  }

  try {
    // Fetch all slots for the given pId and sort them by date in descending order
    const slots = await SlotModel.find({ pId }).sort({ date: -1, slot: -1 });

    if (!slots || slots.length === 0) {
      return res.status(404).json({ error: "No slots found for this patient." });
    }

    return res.status(200).json(slots); // Return all slots
  } catch (error) {
    console.error("Error fetching slots for patient:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getAppointmentDetails = async (req, res) => {
  const { appId } = req.query;

  if (!appId) {
    return res.status(400).json({ error: "Appointment ID is required." });
  }

  try {
    const slot = await SlotModel.findOne({ appId }).exec();
    if (!slot) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    return res.status(200).json({
      message: "Appointment details retrieved successfully.",
      appointment: slot,
    });
  } catch (error) {
    console.error("Error fetching appointment details:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getAllBookedSlotsForDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ 
      success: false, 
      error: "Date query parameter is required." 
    });
  }

  try {
    // Trim and normalize the date for matching
    const normalizedDate = date.trim();

    // Query for all booked slots on the specified date, ignoring trailing whitespace
    const bookedSlots = await SlotModel.find({
      date: { $regex: `^${normalizedDate}$`, $options: "i" }
    });

    if (!bookedSlots.length) {
      return res.status(404).json({ 
        success: false, 
        message: "No booked slots found for the given date." 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booked slots retrieved successfully.",
      date: normalizedDate,
      slots: bookedSlots,
    });
  } catch (error) {
    console.error("Error fetching booked slots for the given date:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const markSlotAsDone = async (req, res) => {
  const { appId } = req.body; // Ensure this matches frontend behavior

  // Validate input
  if (!appId) {
    console.warn("Missing Appointment ID in request.");
    return res.status(400).json({ error: "Appointment ID is required." });
  }

  try {
    // Find and update the slot
    const updatedSlot = await SlotModel.findOneAndUpdate(
      { appId },
      { done: true },
      { new: true } // Return the updated document
    );

    if (!updatedSlot) {
      console.info(`Slot with appId ${appId} not found or already marked as done.`);
      return res.status(404).json({
        success: false,
        message: "Slot not found or already marked as done.",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Slot marked as done successfully.",
      slot: updatedSlot,
    });
  } catch (error) {
    // Log and return error
    console.error(`Error updating slot for appId ${appId}:`, error.message);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getAllSlotsForUser = async (req, res) => {
  const { pId } = req.query;

  if (!pId) {
    return res.status(400).json({ error: "pID is required." });
  }

  try {
    // Fetch all slots for the user (pId), sorted by date and time
    const userSlots = await SlotModel.find({ pId })
      .sort({ date: -1, slot: -1 }) // Sort by most recent date and time slot
      .exec();

    if (userSlots.length === 0) {
      return res.status(404).json({ error: "No slots found for this user." });
    }

    return res.status(200).json({
      message: "Slots retrieved successfully.",
      slots: userSlots, // Return all booked slots for the user
    });
  } catch (error) {
    console.error("Error fetching user slots:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};



module.exports = {
  getAppointmentDetails,
  getRecentSlot,
  getAllSlotsForUser,
  bookSlot,
  checkSlotAvailability,
  getBookedSlots,
  normalizeSlotData,
  getAllBookedSlotsForDate,
  markSlotAsDone
};
