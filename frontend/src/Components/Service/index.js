import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

function Service() {
  const [startDate, setStartDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    age: "",
    session: "Choose...",
    slot: "",
    service: "Vaccination",
    pId: "",
  });
  const navigate = useNavigate(); 
  const [availableSlots, setAvailableSlots] = useState([]);
const [bookedSlots, setBookedSlots] = useState([]);

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [message, setMessage] = useState("");

  // Calculate today's date and the maximum date (4 days from now)
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 4);

  // Retrieve user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setFormData((prev) => ({ ...prev, pId: user._id }));
    }
  }, []);

  // Fetch available slots dynamically when date or session changes
  useEffect(() => {
    if (startDate && formData.session !== "Choose...") {
      fetchAvailableSlots();
    }
  }, [startDate, formData.session]);

  const fetchAvailableSlots = async () => {
    if (!startDate || formData.session === "Choose...") {
      setMessage("Please select a date and session.");
      return;
    }
    
    console.log("startDate selected: ", startDate);
    
    // Format the selected date to YYYY-MM-DD manually to avoid timezone issues
    const formattedDate = startDate.getFullYear() + '-' 
      + String(startDate.getMonth() + 1).padStart(2, '0') + '-' 
      + String(startDate.getDate()).padStart(2, '0');
      
    console.log("Formatted date:", formattedDate);
    console.log(`📅 Requesting slots for: ${formattedDate} ${formData.session}`);
  
    const url = `http://localhost:8000/slot/availability?date=${formattedDate}&session=${formData.session}`;
    console.log("Request URL:", url);
    
    setLoadingSlots(true);
    
    try {
      const response = await fetch(url);
      const data = await response.json();
    
      console.log("📢 Fetched Data from API:", data);
    
      if (response.ok) {
        // Filter out booked slots from the available slots
        const availableSlots = data.slots.filter(
          (slot) => !data.bookedSlots.includes(slot)
        );
    
        console.log(`✅ Available Slots for ${formattedDate} (${formData.session}):`, availableSlots);
        console.log(`❌ Booked Slots for ${formattedDate} (${formData.session}):`, data.bookedSlots);
    
        setAvailableSlots(availableSlots);
        setBookedSlots(data.bookedSlots);
    
        setMessage(availableSlots.length ? "" : "No slots available for the selected session.");
      } else {
        setMessage(data.error || "Error fetching slots.");
      }
    } catch (error) {
      setMessage("Failed to fetch slots. Please try again later.");
    } finally {
      setLoadingSlots(false);
    }
  };
  
  
  
 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Updated Session:", e.target.value);
  };

  const handleSlotSelect = (slot) => {
    setFormData({ ...formData, slot });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.parentName ||
      !formData.age ||
      !formData.session ||
      !formData.slot ||
      !formData.service ||
      !formData.pId
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedDate = startDate.toLocaleDateString("en-CA"); // YYYY-MM-DD format

    const requestData = {
      date: formattedDate,
      slot: formData.slot,
      name: formData.name,
      parentName: formData.parentName,
      age: formData.age,
      session: formData.session,
      service: formData.service,
      pId: formData.pId,
    };

    try {
      const response = await fetch("http://localhost:8000/slot/bookslot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Slot booked successfully!");

        // Save booking details in localStorage
        const bookedDetails = JSON.parse(localStorage.getItem("bookedDetails")) || [];
        bookedDetails.push(requestData);
        localStorage.setItem("bookedDetails", JSON.stringify(bookedDetails));

        // Remove the booked slot from available slots
        setAvailableSlots((prev) => prev.filter((slot) => slot !== formData.slot));
        navigate("/appointment");
      } else {
        alert(data.error || "Failed to book slot.");
      }
    } catch (error) {
      alert("Failed to book slot. Please try again later.");
    }
  }; 
  return (
    <div className="service container mx-auto border p-4 bg-light rounded">
      <h1 className="text-center">Slot Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
            minDate={today}
            maxDate={maxDate}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Parent Name:</label>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Session:</label>
          <select
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Choose...">Choose...</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div>
          <label>Service:</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Vaccination">Vaccination</option>
            <option value="Checkup">Checkup</option> 
          </select>
        </div>
        <div>
          <h5>Available Slots:</h5>
          {loadingSlots ? (
            <p>Loading...</p>
          ) : availableSlots.length > 0 ? (
            <div className="d-flex flex-wrap">
           {availableSlots.map((slot) => (
  <button
    key={slot}
    type="button"
    className={`btn ${formData.slot === slot ? "btn-success" : "btn-secondary"} mx-1 my-1`}
    onClick={() => handleSlotSelect(slot)}
  >
    {slot}
  </button>
))}

            </div>
          ) : (
            <p>{message || "No slots available for the selected date and session."}</p>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="btn w-25 btn-primary mt-3">
            Book Slot
          </button>
        </div>
      </form>
    </div>
  );
}

export default Service;