import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PNavbar from "./Components/Navbar/patient/index";
import CNavbar from "./Components/Navbar/clinic/index";
import Home from "./Components/Home/patientSide/index";
import Chome from "./Components/Home/clinicSide/index";
import Login from "./Components/log/login/index";
import Signup from "./Components/log/signup/index";
import Footer from "./Components/footer/index";
import Service from "./Components/Service/index";
import Diet from "./Components/Home/patientSide/diet/index";
import Personal from "./Components/Home/patientSide/personalInfo/index";
import Prescription from "./Components/Home/patientSide/prescription/index";
import Appointment from "./Components/Home/patientSide/appointment/index";
import Vaccination from "./Components/vaccination/index";
import DeitRecommend from "./Components/dietrecommend/index";
import TermsConditions from "./Components/terms&con/index";
import Slots from "./Components/slot/index";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [isClinicUser, setIsClinicUser] = useState(false);
  const [key, setKey] = useState(0); // Add a key to force re-render

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email === "clinic@gmail.com") {
      setIsClinicUser(true);
    } else {
      setIsClinicUser(false);
    }
  };

  useEffect(() => {
    // Check the user on mount and after login/signup
    checkUser();

    // Listen for any change in localStorage to detect login/signup/logout updates
    const handleStorageChange = () => {
      checkUser();
      setKey((prevKey) => prevKey + 1); // Force re-render by updating the key
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router basename="/pediacare" className="App border container-fluid text-center" key={key}>
      {isClinicUser ? <CNavbar /> : <PNavbar />}
      <Routes>
        <Route path="/Home" element={isClinicUser ? <Chome /> : <Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Personal" element={<Personal />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/vaccination" element={<Vaccination />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/DietRecommend" element={<DeitRecommend />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/Terms" element={<TermsConditions />} />
        <Route path="/slotcontrol" element={<Slots />} />
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
