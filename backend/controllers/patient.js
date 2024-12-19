const PatientModel = require('../models/patient');

// POST Route for Signup
const signup = async (req, res) => {
  const { email, password,mobile,name } = req.body;
  try {
    const newPatient = new PatientModel({ email, password,mobile,name });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to save patient' });
    }
  }
};

const login = async (req,res) => {
  const { email, password } = req.body;

  try {
    const user = await PatientModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }


    res.json({message :"login successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }

}

// GET Route to Fetch All Signup Data
const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.json(patients);
  } catch (error) {
    res.status(500).send('Error retrieving data');
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
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};

// UPDATE Route for Patient
const updatePatient = async (req, res) => {
  const { email, password } = req.body;
  const id = req.params.id;
  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      
      { email, password ,mobile,name},
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

module.exports = {
  signup,
  login,
  getPatients,
  deletePatient,
  updatePatient,
};
