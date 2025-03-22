import React, { useEffect, useState } from "react";

function Prescription() {
  const [medicineData, setMedicineData] = useState([]); // To store medicines for the selected appointment
  const [allPrescriptions, setAllPrescriptions] = useState([]); // To store all prescriptions
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(""); // For error handling
  const [selectedAppId, setSelectedAppId] = useState(null); // To store the selected appointment ID

  // Fetch all medicines when the component mounts
  useEffect(() => {
    const fetchAllPrescriptions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const pId = user?._id;
        if (!pId) {
          throw new Error("Parent ID not found in local storage");
        }

        const response = await fetch(
          `http://localhost:8000/medicine/getMedicines?pId=${pId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAllPrescriptions(data.medicines); // Store all prescriptions in state
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch all prescriptions");
        setLoading(false);
      }
    };

    fetchAllPrescriptions();
  }, []);

  // Fetch medicines for the selected appointment ID
  const fetchMedicineData = async (appId) => {
    setLoading(true); // Start loading data for the selected appointment
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const pId = user?._id;
      if (!pId) {
        throw new Error("Parent ID not found in local storage");
      }

      const response = await fetch(
        `http://localhost:8000/medicine/getMedicines?pId=${pId}&appId=${appId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const selectedPrescription = data.medicines.find(
        (prescription) => prescription.appId === appId
      );

      // Update medicine data for the selected appointment ID
      if (selectedPrescription && selectedPrescription.medicines) {
        setMedicineData(selectedPrescription.medicines);
      } else {
        setMedicineData([]); // No medicines found for this appointment
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch medicines for selected appointment");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto border">
      <div className="row">
        {/* Prescription Details */}
        <div className="col-12 col-md-6 border text-center">
          <h3>Prescription</h3>
          {medicineData.length > 0 ? (
            <div className="card border">
              <h4>Appointment ID: {selectedAppId}</h4>
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Dosage</th>
                      <th>Before/After Meal</th>
                      <th>Session</th>
                      <th>Days to Follow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicineData.map((medicine, index) => (
                      <tr key={index}>
                        <td>{medicine.name}</td>
                        <td>{medicine.dose}</td>
                        <td>{medicine.meal}</td>
                        <td>{medicine.session.join(", ")}</td>
                        <td>{medicine.days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No medicines found for the selected appointment.</p>
          )}
        </div>

        {/* Second Column for All Prescriptions */}
        <div className="col-12 col-md-6 border text-center">
          <h4 className="my-3">All Prescription List</h4>
          <div className="mx-auto w-75">
            {allPrescriptions.length > 0 ? (
              allPrescriptions.map((prescription, index) => (
                <div
                  key={index}
                  className="border rounded-1 d-flex p-2 my-2 justify-content-between"
                  onClick={() => {
                    setSelectedAppId(prescription.appId);
                    fetchMedicineData(prescription.appId); // Fetch medicines for the selected appointment
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <h6>Appointment ID: {prescription.appId}</h6>
                  <i className="bi lh-1 bi-arrow-right text-dark fs-4"></i>
                </div>
              ))
            ) : (
              <p>No prescriptions found for this patient.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
