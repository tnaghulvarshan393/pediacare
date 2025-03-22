import React, { useState } from "react";
import "./index.css";

function Chome() {
  const [medicineData, setMedicineData] = useState({
    medicines: [],
  });
  const [previousAppointment, setPreviousAppointment] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState({
    name: "",
    dose: "",
    meal: "",
    session: { morning: false, afternoon: false, night: false },
    days: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [details, setDetails] = useState({
    appointment: {},
    patient: {},
  });
  const [vaccinationDetails, setVaccinationDetails] = useState({
    finished: [],
    upcoming: [],
  });
  const [error, setError] = useState(null);

 
  const handleSearch = async () => {
    try {
      const appointmentResponse = await fetch(
        `http://localhost:8000/slot/getAppointment?appId=${appointmentNumber}`
      );
  
      if (!appointmentResponse.ok) {
        throw new Error("Failed to fetch appointment details");
      }
  
      const appointmentData = await appointmentResponse.json();
  
      const patientResponse = await fetch(
        `http://localhost:8000/patient/getPatient?pId=${appointmentData.appointment.pId}`
      );
  
      if (!patientResponse.ok) {
        throw new Error("Failed to fetch patient details");
      }
  
      const patientData = await patientResponse.json();
  
      setDetails({
        appointment: appointmentData.appointment || {},
        patient: patientData.patient || {},
      });
  
      fetchVaccinationDetails(appointmentData.appointment.pId);
  
      // Fetch Medicines for this appointment
      fetchMedicines(appointmentNumber);
  
      setError(null);
    } catch (error) {
      console.error("Error fetching details:", error);
      setError(error.message);
    }
  };
  
  
  

  const fetchVaccinationDetails = async (pId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/vaccination/getVaccinationDetails/${pId}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch vaccination details");
      }
  
      const data = await response.json();
      console.log("Vaccination details fetched:", data); // Debugging line
  
      // Classifying vaccines as finished or upcoming
      const finishedVaccines = data.data.vaccination.filter(vaccine => !vaccine.availability);
      const upcomingVaccines = data.data.vaccination.filter(vaccine => vaccine.availability);
  
      setVaccinationDetails({
        finished: finishedVaccines,
        upcoming: upcomingVaccines,
      });
    } catch (error) {
      console.error("Error fetching vaccination details:", error);
      setError(error.message);
    }
  };
  
  const [isUpdate, setIsUpdate] = useState(false);

const fetchMedicines = async (appId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/medicine/getMedicinesById?appId=${appId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch medicines");
    }

    const data = await response.json();

    if (data.medicines.length > 0) {
      setMedicineData({ medicines: data.medicines });
      setIsUpdate(true); // If medicines exist, show Update button
    } else {
      setMedicineData({ medicines: [] });
      setIsUpdate(false); // If no medicines, show Submit button
    }
  } catch (error) {
    console.error("Error fetching medicines:", error);
    setError(error.message);
  }
};

 
  const handleAddMedicine = () => {
    const newMedicine = {
      ...currentMedicine,
      meal: currentMedicine.meal.toLowerCase(),
      session: Object.keys(currentMedicine.session).filter(
        (key) => currentMedicine.session[key]
      ),
    };

    if (editingIndex !== null) {
      // Update existing medicine
      setMedicineData((prev) => {
        const updatedMedicines = [...prev.medicines];
        updatedMedicines[editingIndex] = newMedicine;
        return { medicines: updatedMedicines };
      });
      setEditingIndex(null);
    } else {
      // Add new medicine
      setMedicineData((prev) => ({
        medicines: [...prev.medicines, newMedicine],
      }));
    }

    setCurrentMedicine({
      name: "",
      dose: "",
      session: { morning: false, afternoon: false, night: false },
      meal: "",
      days: "",
    });
  };
 
  const handleSubmitOrUpdate = async () => {
    if (!medicineData.medicines.length) {
      setError("No medicines to submit or update!");
      return;
    }
  
    const medicinePayload = {
      appId: appointmentNumber,
      medicines: medicineData.medicines,
      pId: details.appointment.pId,
    };
  
    try {
      let response;
      
      if (isUpdate) {
        // Update existing medicines
        response = await fetch(
          `http://localhost:8000/medicine/updateMedicine/${appointmentNumber}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(medicinePayload),
          }
        );
      } else {
        // Submit new medicines
        response = await fetch("http://localhost:8000/medicine/addMedicine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicinePayload),
        });
      }
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error submitting or updating medicines:", errorText);
        throw new Error("Failed to submit/update medicines");
      }
  
      alert(isUpdate ? "Medicines updated successfully!" : "Medicines submitted successfully!");
      setIsUpdate(true); // Ensure update mode is set
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };
  
 
  const handleMedicineChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSessionChange = (e) => {
    const { name, checked } = e.target;
    setCurrentMedicine((prev) => ({
      ...prev,
      session: { ...prev.session, [name]: checked },
    }));
  };
 
const handleEditMedicine = (index) => {
  const medicineToEdit = medicineData.medicines[index];
  setCurrentMedicine({
    ...medicineToEdit,
    session: {
      morning: medicineToEdit.session.includes("morning"),
      afternoon: medicineToEdit.session.includes("afternoon"),
      night: medicineToEdit.session.includes("night"),
    },
  });
  setEditingIndex(index);
};
const handleUpdateMedicine = async () => {
  if (!medicineData.medicines.length) {
    setError("No medicines to update!");
    return;
  }

  const updatedMedicineData = {
    appId: appointmentNumber,
    medicines: medicineData.medicines,
    pId: details.appointment.pId,
  };

  console.log("Updating medicines with data:", updatedMedicineData);

  try {
    const response = await fetch(
      `http://localhost:8000/medicine/updateMedicine/${appointmentNumber}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMedicineData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error updating medicines:", errorText);
      throw new Error("Failed to update medicines");
    }

    console.log("Medicines updated successfully");
    alert("Medicines updated successfully!");
  } catch (error) {
    console.error("Error:", error);
    setError(error.message);
  }
};


  return (
    <div className="container clinic-side mx-auto ">
      <div className="row ">
        <div className="col-12  col-lg-6">
          <div className="w-100  text-center">
            <h2>Patient Details</h2>
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi text-dark bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Appointment"
                  value={appointmentNumber}
                  onChange={(e) => setAppointmentNumber(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              {[
  { label: "Service", value: details.appointment?.service },
  { label: "Appointment Date", value: details.appointment?.date },
  { label: "Session", value: details.appointment?.session },
  { label: "Slot Time", value: details.appointment?.slot },
  { label: "Child Name", value: details.appointment?.name },
  { label: "Gender", value: details.patient?.gender },
  { label: "DOB", value: details.patient?.dob },
  { label: "Father Name", value: details.patient?.fatherName },
  { label: "Mother Name", value: details.patient?.motherName },
  { label: "Phone NO", value: details.patient?.mobile },
  { label: "Address", value: details.patient?.address },
].map((item, index) => (
  <div className="input-group mb-3" key={index}>
    <span className="input-group-text">{item.label}</span>
    <input
      type="text"
      className="form-control"
      value={item.value || ""}
      disabled
    />
  </div>
))}

            </form>
          </div>
        </div>

        <div className="col-12  col-lg-6 text-center">
          <h1>Medicine Prescription</h1>
          <form className="my-2 mx-auto rounded border p-3 w-75">
            <div className="input-group mb-3">
              <span className="input-group-text">Medicine Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="Medicine Name"
                name="name"
                value={currentMedicine.name}
                onChange={handleMedicineChange}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Dosage</span>
              <input
                type="text"
                className="form-control"
                placeholder="Dosage"
                name="dose"
                value={currentMedicine.dose}
                onChange={handleMedicineChange}
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text">Before or After Meal</label>
              <select
                className="form-select"
                name="meal"
                value={currentMedicine.meal}
                onChange={handleMedicineChange}
              >
                <option value="">Choose...</option>
                <option value="before">Before</option>
                <option value="after">After</option>
              </select>
            </div>
            <h6>Timing</h6>
            <div className="d-flex justify-content-evenly border rounded p-2">
              {["morning", "afternoon", "night"].map((time) => (
                <div className="form-check" key={time}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`flexCheck${time}`}
                    name={time}
                    checked={currentMedicine.session[time]}
                    onChange={handleSessionChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexCheck${time}`}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <div className="input-group mb-3 my-3">
              <span className="input-group-text">Days to Follow</span>
              <input
                type="text"
                className="form-control"
                placeholder="Days to follow"
                name="days"
                value={currentMedicine.days}
                onChange={handleMedicineChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddMedicine}
            >
              Add Medicine
            </button>
          </form>

          <div className="medicine-list">
            <h3>Medicines List</h3>
            <table className="table table-bordered text-center ">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Before/After Meal</th>
                  <th>Timing</th>
                  <th>Days to Follow</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicineData.medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td>{medicine.name}</td>
                    <td>{medicine.dose}</td>
                    <td>{medicine.meal}</td>
                    <td>{medicine.session.join(", ")}</td>
                    <td>{medicine.days}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditMedicine(index)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-outline-primary" onClick={handleSubmitOrUpdate}>
  {isUpdate ? "Update Medicine" : "Submit"}
</button>



          </div>
        
        </div>
      </div>

      <div className="row my-2">
  {/* Vaccination History Section */}
  <div className="col-12 border row col-md-9 g-2 text-center">
    <h5>Patient Vaccination History</h5>
    <div className="col-12 col-md-6  finished-vaccine">
      <h6>Finished Vaccines</h6>
      {vaccinationDetails.finished.length > 0 ? (
        vaccinationDetails.finished.map((vaccine, index) => (
          <div className="border rounded text-light bg-dark my-1 d-flex justify-content-between" key={index}>
            <h6><b className="text-danger">Age:</b> {vaccine.age}</h6>
            <p><b className="text-danger">Vaccine: </b>{vaccine.vacciname}</p>
            <p><b className="text-danger">Dose: </b>{vaccine.dose}</p>
          </div>
        ))
      ) : (
        <p>No finished vaccines or data is being loaded...</p>
      )}
    </div>
    <div className="col-12 col-md-6    finished-vaccine">
      <h6>Upcoming Vaccines</h6>
      {vaccinationDetails.upcoming.length > 0 ? (
        vaccinationDetails.upcoming.map((vaccine, index) => (
          <div className="border rounded bg-dark text-light my-1 d-flex justify-content-between" key={index}>
            <h6> <b className="text-danger">Age:</b> {vaccine.age}</h6>
            <p><b className="text-danger">Vaccine:</b>  {vaccine.vacciname}</p>
            <p><b className="text-danger">Dose:</b> {vaccine.dose}</p>
          </div>
        ))
      ) : (
        <p>No upcoming vaccines or data is being loaded...</p>
      )}
    </div>
  </div>
</div>

    </div>
  );
}

export default Chome;  