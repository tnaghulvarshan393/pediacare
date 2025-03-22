const mongoose = require('mongoose');
const Medicine = require('../models/medicine');  

// Create a new medicine record
const addMedicine = async (req, res) => {
  try {
    const { appId, medicines, pId } = req.body;

    if (!appId || !medicines || !pId || medicines.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if each medicine has the necessary fields
    for (let i = 0; i < medicines.length; i++) {
      const { name, dose, session, meal, days } = medicines[i];
      if (!name || !dose || !session || !meal || !days) {
        return res.status(400).json({ message: `Invalid medicine data at index ${i}: ${JSON.stringify(medicines[i])}` });
      }
    }

    const newMedicine = new Medicine({ appId, medicines, pId });
    await newMedicine.save();
    res.status(201).json({ message: 'Medicine record added successfully', newMedicine });
  } catch (error) {
    console.error('Error adding medicine:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Fetch medicines for a specific patient by pId
const getMedicines = async (req, res) => {
  try {
    const { pId } = req.query;

    if (!pId) {
      return res.status(400).json({ message: "Patient ID (pId) is required" });
    }

    const medicineRecords = await Medicine.find({ pId });

    if (!medicineRecords.length) {
      return res.status(404).json({ message: "No medicines found" });
    }

    res.status(200).json({ message: "Medicines found", medicines: medicineRecords });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



 
const getMedicineByAppId = async (req, res) => {
  try {
      const { appId } = req.query;  // ✅ Correct: Extracting from query

      if (!appId) {
          return res.status(400).json({ error: "Appointment ID is required" });
      }

      const medicine = await Medicine.findOne({ appId });

      if (!medicine) {
          return res.status(404).json({ error: "No medicine record found" });
      }

      res.status(200).json(medicine);
  } catch (error) {
      console.error("Error fetching medicine:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};



// Update an existing medicine record
const updateMedicine = async (req, res) => {
  try {
    console.log("Params received:", req.params); // Debugging
    console.log("Body received:", req.body); // Debugging

    const { appId } = req.params;
    const { medicines } = req.body;

    if (!appId) {
      return res.status(400).json({ message: "Appointment ID (appId) is required" });
    }

    if (!medicines || medicines.length === 0) {
      return res.status(400).json({ message: "Medicines data is required" });
    }

    const updatedMedicine = await Medicine.findOneAndUpdate(
      { appId }, // Find by appId
      { medicines }, // Update the medicines array
      { new: true } // Return updated document
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "No medicine record found for this appointment" });
    }

    res.status(200).json({ message: "Medicine updated successfully", updatedMedicine });
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





// Delete a medicine record
const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMedicine = await medicineModel.findByIdAndDelete(id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  getMedicineByAppId
};
