import React, { useState, useEffect } from "react";
import ServiceBnr from "./img/service banner.png";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import './index.css';

function Service() {
  const [startDate, setStartDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slots, setSlots] = useState([]);  // slots state
  const [formData, setFormData] = useState({
    name: '',
    parentName: '',
    age: '',
    session: 'Choose...',
    slot: '',
    service: 'Vaccination',
    pId: '',
  });

  // Get user ID from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Slot times
  const SlotAm = [
    "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", 
    "9:30", "9:45", "10:00", "10:15", "10:30", "10:45"
  ];

  const SlotPm = [
    "6:00", "6:15", "6:30", "6:45", "7:00", "7:15", 
    "7:30", "7:45", "8:00", "8:15", "8:30", "8:45"
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle service selection
  const handleService = (e) => {
    setFormData({ ...formData, service: e.target.textContent });
  };

  // Fetch slots based on selected date
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState(null);
  
  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSlotError(null);
      try {
        const formattedDate = startDate.toISOString();
        const response = await fetch(`http://localhost:8000/clinic/slots?date=${formattedDate}`);
        const data = await response.json();
        
        // Debugging logs
        console.log("Fetched slots from backend:", data);
        
        setSlots(data.slots || []);
      } catch (error) {
        setSlotError("Failed to fetch slots. Please try again.");
      } finally {
        setLoadingSlots(false);
      }
    };
  
    fetchSlots();
  }, [startDate]);

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
  
    if (!userId) {
      alert("User ID (_id) is missing. Please log in again.");
      return;
    }
  
    const updatedFormData = { 
      ...formData, 
      pId: userId,  // Use the `_id` as the patient ID
      date: startDate.toISOString(),
    };
  
    if (!updatedFormData.slot) {
      alert("Please select a valid slot.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:8000/clinic/slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Slot booked successfully!");
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.time === updatedFormData.slot
              ? { ...slot, bookedBy: userId }
              : slot
          )
        );
      } else {
        alert(data.error || "Failed to book the slot.");
      }

    } catch (error) {
      console.error("Error booking slot:", error);
      alert("There was an issue booking your slot. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    console.log("Selected Slot:", slot); // Log selected slot
    console.log("Slots Array:", slots); // Log all slots to verify structure
    
    // Check if the slot exists in the fetched slots data
    const selectedSlot = slots.find((s) => s.time === slot);

    console.log("Selected Slot Found:", selectedSlot); // Log selected slot found

    if (!selectedSlot) {
        alert("Invalid slot selected.");
        return;
    }

    // Check if the slot is already booked by another user
    if (selectedSlot.bookedBy && selectedSlot.bookedBy !== userId) {
        alert("This slot is already booked by another user. Please choose another slot.");
        return;
    }

    // Check if the slot is already booked by the current user
    if (selectedSlot.bookedBy === userId) {
        alert("You have already booked this slot.");
        return;
    }

    // If valid, set the slot in formData
    setFormData({ ...formData, slot });
};


  // Get button class based on slot status
  const getSlotClass = (slot) => {
    const selectedSlot = slots.find((s) => s.time === slot);

    // If no matching slot, return default class
    if (!selectedSlot) return "btn-light"; // Free slot (light color)

    if (selectedSlot.bookedBy === userId) {
        return "btn-success"; // Booked by current user (green)
    } else if (selectedSlot.bookedBy) {
        return "btn-danger"; // Booked by someone else (red)
    } else {
        return "btn-light"; // Free slot (light color)
    }
};


  return (
    <div className="service container mx-auto border">
      <div className="service-banner position-relative border">
        <img src={ServiceBnr} className="w-100 opacity-50 z-0 rounded h-100" alt="Service Banner" />
        <h1 className="display-1 fw-1 position-absolute">Our Service</h1>
      </div>
      <div className="bg-dark border rounded my-2">
        <div className="row">
          <div className="col-12 col-md-4 my-2 service-switch">
            <button onClick={handleService} className="p-2 mx-auto btn btn-info">Vaccination</button>
            <button onClick={handleService} className="p-2 mx-auto btn btn-info">Checkup</button>
            <button onClick={handleService} className="p-2 mx-auto btn btn-info">Emergency</button>
          </div>
          <div className="col-12 col-md-8">
            <form className="my-4 text-center">
              <div className="mx-auto justify-content-start my-0 d-flex w-75">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Select Date"
                  className="p-2 border my-3 rounded date-picker"
                  minDate={new Date()}
                  maxDate={new Date(new Date().setDate(new Date().getDate() + 3))}
                />
              </div>
              <div className="input-group w-75 mx-auto">
                <span className="input-group-text">Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group z-1 w-75 my-3 mx-auto">
                <span className="input-group-text">Parent Name</span>
                <input
                  type="text"
                  name="parentName"
                  placeholder="Parent Name"
                  className="form-control"
                  value={formData.parentName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-3 my-3 mx-auto w-75">
                <span className="input-group-text">Age</span>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter Current Age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-2 w-75 mx-auto">
                <label className="fw-bold">Select Session</label>
                <select
                  className="form-select"
                  name="session"
                  onChange={handleInputChange}
                  value={formData.session}
                >
                  <option value="Choose...">Choose Session</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="container">
                <div className="row">
                {formData.session === "AM" && SlotAm.map((slot, i) => (
    <div className="col-4 col-lg-3" key={i}>
        <button
            type="button"
            className={`w-75 text-center my-2 p-2 btn ${getSlotClass(slot)}`}
            onClick={() => handleSlotSelect(slot)}
            disabled={!!slots.find((s) => s.time === slot)?.bookedBy}
        >
            {slot}
        </button>
    </div>
))}

{formData.session === "PM" && SlotPm.map((slot, i) => (
    <div className="col-4 col-lg-3" key={i}>
        <button
            type="button"
            className={`w-75 text-center my-2 p-2 btn ${getSlotClass(slot)}`}
            onClick={() => handleSlotSelect(slot)}
            disabled={!!slots.find((s) => s.time === slot)?.bookedBy}
        >
            {slot}
        </button>
    </div>
))}

                </div>
              </div>
              <button 
                className="btn btn-success w-75 mt-4" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
