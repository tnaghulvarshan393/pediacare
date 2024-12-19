const express = require('express');
const mongoose = require('mongoose'); // Declared once at the top
const cors = require('cors');
const patientroutes = require('./routes/patient');
const slotRoutes = require('./routes/slot'); 

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/clinic', {
  useNewUrlParser: true, // Optional with newer versions
  useUnifiedTopology: true, // Optional with newer versions
})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Use Signup Routes
app.use('/patient', patientroutes); // Use the login route 
app.use('/clinic', slotRoutes); 
slotRoutes.get('/slots', (req, res) => {
  console.log('Request received at /clinic/slots with date:', req.query.date);
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required' });
  }
  res.status(200).json({ message: 'Route is working', date });
});
// Start Server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
