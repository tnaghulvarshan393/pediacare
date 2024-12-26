import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/patientSide/index";
import Chome from "./Components/Home/clinicSide/index";
import Login from "./Components/log/login/index";
import Signup from "./Components/log/signup/index";
import Footer from "./Components/footer/index";
import Service from "./Components/Service/index";
import Diet from "./Components/Home/patientSide/diet/index";
import Personal from "./Components/Home/patientSide/personalInfo/index";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [isClinicUser, setIsClinicUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse user object from localStorage
    if (user && user.email === "clinic@gmail.com") {
      setIsClinicUser(true); // Set `isClinicUser` to true if email matches
    } else {
      setIsClinicUser(false);
    }
  }, []);

  return (
    <Router className="App border container-fluid text-center">
      <Navbar />
      <Routes>
        {/* Conditional route rendering */}
        {isClinicUser ? (
          <Route path="/Home" element={<Chome />} />
        ) : (
          <Route path="/Home" element={<Home />} />
        )}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Personal" element={<Personal />} />
        <Route path="/diet" element={<Diet />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
