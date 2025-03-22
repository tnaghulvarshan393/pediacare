const VaccinationModel = require('../models/vaccination');

// Default vaccination schedule
  const defaultVaccinationSchedule = [
    { "vacciname": "BCG", "dose": "0.1 ml", "age": "At Birth", "availability": true },
    { "vacciname": "OPV Zero dose", "dose": "2 drops", "age": "At Birth", "availability": true },
    { "vacciname": "Hep B birth dose", "dose": "0.5 ml", "age": "At Birth", "availability": true },
    { "vacciname": "Penta-1", "dose": "0.5 ml", "age": "6th week", "availability": true },
    { "vacciname": "OPV-1", "dose": "2 drops", "age": "6th week", "availability": true },
    { "vacciname": "IPV-1", "dose": "0.1 ml", "age": "6th week", "availability": true },
    { "vacciname": "Rota-1", "dose": "5 drops", "age": "6th week", "availability": true },
    { "vacciname": "Penta-2", "dose": "0.5 ml", "age": "10th week", "availability": true },
    { "vacciname": "OPV-2", "dose": "2 drops", "age": "10th week", "availability": true },
    { "vacciname": "Rota-2", "dose": "5 drops", "age": "10th week", "availability": true },
    { "vacciname": "Penta-3", "dose": "0.5 ml", "age": "14th week", "availability": true },
    { "vacciname": "OPV-3", "dose": "2 drops", "age": "14th week", "availability": true },
    { "vacciname": "IPV-2", "dose": "0.1 ml", "age": "14th week", "availability": true },
    { "vacciname": "Rota-3", "dose": "5 drops", "age": "14th week", "availability": true },
    { "vacciname": "MR 1st dose", "dose": "0.5 ml", "age": "9 months", "availability": true },
    { "vacciname": "JE 1", "dose": "0.5 ml", "age": "9 months", "availability": true },
    { "vacciname": "DPT 1st booster", "dose": "0.5 ml", "age": "16-24 months", "availability": true },
    { "vacciname": "OPV booster", "dose": "2 drops", "age": "16-24 months", "availability": true },
    { "vacciname": "MR 2nd dose", "dose": "0.5 ml", "age": "16-24 months", "availability": true },
    { "vacciname": "JE 2", "dose": "0.5 ml", "age": "16-24 months", "availability": true },
    { "vacciname": "DPT 2nd booster", "dose": "0.5 ml", "age": "5-6 Years", "availability": true },
    { "vacciname": "TT single dose", "dose": "0.5 ml", "age": "10th Year", "availability": true },
    { "vacciname": "TT single dose", "dose": "0.5 ml", "age": "16th Year", "availability": true },
  ];

// Save or update vaccination data for a user
const saveVaccination = async (req, res) => {
  const { userId } = req.body;

  try {
    let record = await VaccinationModel.findOne({ userId });

    if (!record) {
      // Create a new record with default vaccination data if it doesn't exist
      record = new VaccinationModel({
        userId,
        vaccination: defaultVaccinationSchedule,
      });
      await record.save();
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Update vaccination status in the backend
const getVaccinationStatus = async (req, res) => {
  const { userId, vaccineName } = req.query;

  try {
    const record = await VaccinationModel.findOne({ userId });
    if (!record) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const vaccine = record.vaccination.find(v => v.vacciname === vaccineName);
    if (!vaccine) {
      return res.status(404).json({ success: false, message: 'Vaccine not found for this user' });
    }

    res.status(200).json({ success: true, completed: vaccine.availability });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get vaccination details for a user
const getVaccinationDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    let record = await VaccinationModel.findOne({ userId });

    if (!record) {
      // If no record exists, create a default record for the user
      record = new VaccinationModel({
        userId,
        vaccination: defaultVaccinationSchedule,
      });
      await record.save();
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update vaccination status for a user
const updateVaccinationStatus = async (req, res) => {
  const { userId, vacciname, availability } = req.body;

  try {
    const record = await VaccinationModel.findOne({ userId });

    if (!record) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const vaccination = record.vaccination.find(vaccine => vaccine.vacciname === vacciname);

    if (!vaccination) {
      return res.status(404).json({ success: false, message: 'Vaccine not found for this user' });
    }

    vaccination.availability = availability;

    await record.save();

    res.status(200).json({ success: true, message: 'Vaccination status updated', data: vaccination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 


module.exports = { saveVaccination , updateVaccinationStatus,getVaccinationStatus, getVaccinationDetails };
