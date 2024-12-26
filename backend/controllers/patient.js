const PatientModel = require('../models/patient'); // Declare only once

// POST Route for Signup
const signup = async (req, res) => {
  const { email, password, mobile, name } = req.body;

  try {
    const newPatient = new PatientModel({
      email,
      password, // Directly store the plain password
      mobile,
      name,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Failed to save patient' });
    }
  }
};

// POST Route for Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await PatientModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
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

module.exports = {
  signup,
  login,
  getPatients,
  updatePatient,
  deletePatient,
};
