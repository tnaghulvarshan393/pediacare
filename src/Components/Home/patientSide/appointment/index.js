import React, { useState, useEffect } from "react";
import "./index.css";

function Appointment() {
  const [appointments, setAppointments] = useState([]); // Stores all fetched appointments
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Stores selected appointment
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || !userData._id) {
          throw new Error("User ID not found in localStorage.");
        }

        const parentId = userData._id;
        console.log("Fetching recent appointments for pId:", parentId);

        const response = await fetch(
          `http://localhost:8000/slot/recentSlot?pId=${parentId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        let data = await response.json();
        console.log("Fetched Appointments:", data);

        data.reverse(); // ✅ Reverse the order to show the latest first

        setAppointments(data);
        if (data.length > 0) {
          setSelectedAppointment(data[0]); // ✅ Default to the most recent appointment
        } else {
          setError("No recent appointments found.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch appointments.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container row mx-auto text-center">
      {/* Left Side: Appointment Details */}
      <div className="col-6">
        <h1>Appointment Details</h1>
        {error && <p className="text-danger">{error}</p>}
        <div className="mx-auto border card bg-dark">
          <div className="card-body">
            <form className="mx-auto bg-secondary p-2 rounded">
              <div className="input-group mb-3">
                <span className="input-group-text">Appointment ID</span>
                <input type="text" className="form-control" value={selectedAppointment?.appId || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Service Type</span>
                <input type="text" className="form-control" value={selectedAppointment?.service || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Child Name</span>
                <input type="text" className="form-control" value={selectedAppointment?.name || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Caretaker Name</span>
                <input type="text" className="form-control" value={selectedAppointment?.parentName || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Age</span>
                <input type="text" className="form-control" value={selectedAppointment?.age || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Session</span>
                <input type="text" className="form-control" value={selectedAppointment?.session || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Timing</span>
                <input type="text" className="form-control" value={selectedAppointment?.slot || ""} disabled />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Appointment Date</span>
                <input type="text" className="form-control" value={selectedAppointment?.date || ""} disabled />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side: Appointment List */}
      <div className="col-6 my-1 border text-center">
        <h1>Appointment List</h1>
        <div className="card bg-dark text-dark">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.appId}
                className={`d-flex justify-content-evenly w-75 mx-auto my-2 rounded p-1 ${
                  selectedAppointment?.appId === appointment.appId ? "bg-info" : "bg-light"
                }`}
                onClick={() => setSelectedAppointment(appointment)} // ✅ Click to update details
                style={{ cursor: "pointer" }}
              >
                <p className="lh-1"><strong className="text-danger">App Id:</strong> {appointment.appId}</p>
                <p className="lh-1"><strong className="text-danger">Date:</strong> {appointment.date}</p>
              </div>
            ))
          ) : (
            <p>No Appointments Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
