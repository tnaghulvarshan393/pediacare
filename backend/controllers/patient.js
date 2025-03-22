const { PatientModel, CounterModel }= require('../models/patient'); // Declare only once

// POST Route for Signup
const getNextPatientNo = async () => {
  const counter = await CounterModel.findOneAndUpdate(
    { name: 'patientNo' }, // Search for the patient number counter
    { $inc: { value: 1 } }, // Increment the value
    { new: true, upsert: true } // Create if not exists
  );
  return counter.value;
};

// POST Route for Signup
const signup = async (req, res) => {
  const { email, password, mobile, name } = req.body;

  try {
    const existingPatientByEmail = await PatientModel.findOne({ email });
    const existingPatientByMobile = await PatientModel.findOne({ mobile });

    if (existingPatientByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (existingPatientByMobile) {
      return res.status(400).json({ error: 'Mobile number already exists' });
    }

    // Get next patient number
    const patientNo = await getNextPatientNo();

    // Save new patient
    const newPatient = new PatientModel({
      patientNo,
      email,
      password, // Ensure this is hashed in production
      mobile,
      name,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Signup error:', error.message); // Log the error message
    res.status(500).json({ error: 'Failed to save patient', details: error.message });
  }
};





// POST Route for Login
const login = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or mobile

  try {
    const user = await PatientModel.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email/mobile or password.' });
    }

    const { password: _, ...userDetails } = user._doc;

    res.json({
      message: 'Login successful',
      user: userDetails,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


// GET Route to Fetch All Signup Data
const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.json(patients);
  } catch (error) {
    console.error('Error retrieving patients:', error);
    res.status(500).send('Error retrieving data');
  }
};

// Update Patient by ID
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
};


// DELETE Route to Remove a Patient
const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPatient = await PatientModel.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully', patient: deletedPatient });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};
//for clinic fetch data
const getPatientDetails = async (req, res) => {
  let { pId } = req.query; // Retrieve the patient ID from query params

  if (!pId) {
    return res.status(400).json({ error: "pId is required." });
  }

  // Trim any whitespace or newline characters
  pId = pId.trim();

  try {
    // Search by _id
    const patient = await PatientModel.findOne({ _id: pId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json({
      patient,
    });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};



module.exports = {
  signup,
  login,
  getPatients,
  updatePatient,
  deletePatient,
  getPatientDetails
};
