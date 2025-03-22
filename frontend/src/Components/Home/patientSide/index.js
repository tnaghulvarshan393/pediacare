import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
import diet from "./img/Untitled design (5).png";
import tablet from "./img/Untitled design (2).png";
import personal from "./img/Untitled design (6).png";
import carousel1 from "./img/carousel1.png";
import carousel3 from "./img/carousel3.png";
import carousel2 from "./img/carouse2.png";
import Doc from "./img/doc.png";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextVaccine, setNextVaccine] = useState({
    name: "No upcoming vaccines",
    date: "",
    daysToDue: null,
  });

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHelloCaretaker = () => {
    // Implement caretaker-specific actions here
  };

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } 
 
    
    // Fetch DOB and calculate next vaccine
    const dob = localStorage.getItem("dob");
    if (dob) {
      calculateNextVaccine(new Date(dob));
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.dob) {
      calculateNextVaccine(new Date(user.dob));
    }
  }, []); 
  const calculateNextVaccine = async (dob) => {
    const schedule = [
      { ageInDays: 42, name: "Penta-1, OPV-1, IPV-1, Rota-1" },  // 6th Week
      { ageInDays: 70, name: "Penta-2, OPV-2, Rota-2" },        // 10th Week
      { ageInDays: 98, name: "Penta-3, OPV-3, IPV-2, Rota-3" },  // 14th Week
      { ageInDays: 270, name: "MR 1st Dose, JE-1 (if applicable)" },
      { ageInDays: 365, name: "DPT 1st booster, OPV booster" },
      { ageInDays: 5475, name: "TT single dose (16th Year)" }
    ];
  
    const today = new Date();
    const ageInDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  
    const upcomingVaccines = schedule.filter((v) => v.ageInDays > ageInDays);
  
    let nextVaccine = null;
  
    // Loop through the upcoming vaccines
    for (let i = 0; i < upcomingVaccines.length; i++) {
      const vaccine = upcomingVaccines[i];
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const vaccineStatus = await fetchVaccinationStatus(userId, vaccine.name);
  
      // If the vaccine is not completed, show it as the next vaccine
      if (!vaccineStatus || !vaccineStatus.completed) {
        nextVaccine = vaccine;
        break; // Found the first vaccine that is not completed
      }
    }
  
    // If a next vaccine is found, calculate days remaining
    if (nextVaccine) {
      const dueDate = new Date(dob);
      dueDate.setDate(dueDate.getDate() + nextVaccine.ageInDays);
  
      const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  
      setNextVaccine({
        name: nextVaccine.name,
        date: dueDate.toDateString(),
        daysToDue: daysRemaining,
      });
    } else {
      setNextVaccine({
        name: "All vaccines are up-to-date",
        date: "",
        daysToDue: null,
      });
    }
  };
  
  

  // Fetch vaccination status for a specific vaccine
  const fetchVaccinationStatus = async (userId, vaccineName) => {
    try {
      const response = await fetch(`/vaccination/getVacciStatus?userId=${userId}&vaccineName=${vaccineName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vaccination status");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching vaccination status:", error);
      return { completed: false };
    }
  };
  

  return (
    <div className="container home-com">
      {/* Doctor banner */}
      <div className="w-100 carousel-banner position-relative">
        <p className="display-3 text-center">CHILDCARE CLINIC</p>
        <img className="img-fluid" src={Doc} alt="Doctor Banner" />
        <nav className="text-center">
          <h2>{isLoggedIn ? "" : "For more services"}</h2>
          <button
            className="btn btn-warning display-4"
            onClick={isLoggedIn ? handleHelloCaretaker : handleLogin}
          >
            {isLoggedIn ? "Hello Caretaker" : "Login"}
          </button>
          <h4 className="btn btn-warning my-3 mx-4">Your patient ID: {isLoggedIn ? JSON.parse(localStorage.getItem("user"))?.patientNo : "Not Available"}</h4>

        </nav>
      </div>

      {/* Book Slot and Vaccination Reminder */}
      <div className="row my-4">
        <div className="col-12 col-md-6">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img src={carousel1} className="d-block w-100" alt="carousel" />
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={carousel2} className="d-block w-100" alt="carousel" />
              </div>
              <div className="carousel-item">
                <img src={carousel3} className="d-block w-100" alt="carousel" />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-12 row col-md-6">
          <div className="col-12 col-xl-6 p-4">
            <div className="card my-auto text-light p-2 bg-dark">
              <div className="card-body">
                <h3 className="card-title">Book Slot</h3>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Check-Up
                </h6>
                <p className="card-text">
                pre-book slots for check-up
                </p>
                <Link to="/Service" className="card-link btn btn-primary">
                  Book Slot
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6 p-4">
            <div className="card my-auto text-light p-2 bg-dark">
            <div className="vaccination-info card-body">
  <h2>Upcoming Vaccination</h2>
  <h3 className="text-danger">{nextVaccine.name}</h3>
  {nextVaccine.date && <p>Due Date: {nextVaccine.date}</p>}
  {nextVaccine.daysToDue !== null && (
    <p>Days Remaining: {nextVaccine.daysToDue} day(s)</p>
  )}

  {nextVaccine.daysToDue !== null && nextVaccine.daysToDue <= 3 ? (
    <Link className="btn btn-info" to="/Service">
      Book Slot
    </Link>
  ) : (
    <button className="btn btn-secondary" disabled>
      Opening Soon
    </button>
  )}
</div>

            </div>
          </div>
        </div>
      </div>

      {/* Diet Chart, Personal Details, Doctor Prescription */}
      <div className="row">
        {/* Diet Chart */}
        <div className="col-md-4 bg-light">
          <div className="card my-2 text-center">
            <img src={diet} className="card-img-top" alt="Diet Chart" />
            <div className="card-body">
              <h5 className="card-title">Recommended Diet</h5>
              <p className="card-text">
                CUSTOMIZED DIET PROVIDE BY DOCTOR.
              </p>
              <Link to="/diet" className="btn btn-primary">
                Get Diet
              </Link>
            </div>
          </div>
        </div>

        {/* Personal Data */}
        <div className="col-md-4 bg-light">
          <div className="card my-2 text-center">
            <img
              src={tablet}
              className="card-img-top"
              alt="Medicine Prescription"
            />
            <div className="card-body">
              <h5 className="card-title">Medicine Prescription</h5>
              <p className="card-text">
                Medicine prescription for each slot. 
              </p>
              <Link to='/prescription' className="btn btn-primary">Show Prescription</Link>
            </div>
          </div>
        </div>

        {/* Doctor Prescription */}
        <div className="col-md-4 bg-light">
          <div className="card my-2 text-center">
            <img
              src={personal}
              className="card-img-top"
              alt="Personal Details"
            />
            <div className="card-body">
              <h5 className="card-title">Personal Details</h5>
              <p className="card-text">
                Update user's presonal details.
              </p>
              <Link to="/personal" className="btn btn-primary">
                Personal Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
