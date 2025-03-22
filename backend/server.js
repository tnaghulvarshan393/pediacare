
const express = require('express');
const mongoose = require('mongoose'); // Declared once at the top
const cors = require('cors');
const patientroutes = require('./routes/patient');
const medicineRoutes = require('./routes/medicine');
const slotRoutes = require('./routes/slot'); 
const vaccinationRotes=require('./routes/vaccination');
const dietRoutes=require('./routes/diet');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000 /', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://naghulvarshan0:252434036@cluster0.ic7dq.mongodb.net/clinic?retryWrites=true&w=majority&appName=Cluster0', {

  //  useNewUrlParser: true, 
  //  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Use Signup Routes
app.use('/patient', patientroutes); // Use the login route 
app.use('/slot', slotRoutes);
app.use('/vaccination',vaccinationRotes);
app.use('/medicine', medicineRoutes);
app.use('/diet',dietRoutes);

// Start Server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
