import React, { useState, useEffect } from 'react';
import "./index.css";
import Vacci from "./vacciimg.png";

function Vaccination() {
  const [vaccinationData, setVaccinationData] = useState([]);
  const [completedVaccines, setCompletedVaccines] = useState([]);
  
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    fetchVaccinationData();
  }, []);

  // Fetch vaccination data from the backend
  const fetchVaccinationData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/vaccination/getVaccinationDetails/${userId}`);
      const data = await response.json();

      if (data.success) {
        const pending = data.data.vaccination.filter(vaccine => vaccine.availability);
        const completed = data.data.vaccination.filter(vaccine => !vaccine.availability);

        setVaccinationData(pending);
        setCompletedVaccines(completed);
      } else {
        console.error('No vaccination data found for this user');
      }
    } catch (error) {
      console.error('Error fetching vaccination data:', error);
    }
  };

  // Update vaccination status
  const updateVaccinationStatus = async (vacciname) => {
    try {
      const response = await fetch('http://localhost:8000/vaccination/vaccineStatus', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vacciname, availability: false }),
      });

      const data = await response.json();

      if (data.success) {
        fetchVaccinationData(); // Refresh data after successful update
      } else {
        console.error('Failed to update vaccination status:', data.message);
      }
    } catch (error) {
      console.error('Error updating vaccination status:', error);
    }
  };

  // Remove vaccination status and make it available again
  const removeVaccinationStatus = async (vacciname) => {
    try {
      const response = await fetch('http://localhost:8000/vaccination/vaccineStatus', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vacciname, availability: true }),
      });

      const data = await response.json();

      if (data.success) {
        fetchVaccinationData(); // Refresh data after successful update
      } else {
        console.error('Failed to update vaccination status:', data.message);
      }
    } catch (error) {
      console.error('Error updating vaccination status:', error);
    }
  };

  return (
    <div className='container mx-auto bg-light'>
      <div className='row'>
        <div className='col-12 col-xxl-6'>
        <h3 className='text-danger'>Why do we need Vaccination?</h3>
          <p>
            Vaccinations are a vital part of a child’s health and well-being. They protect children from serious and
            potentially life-threatening diseases by strengthening their immune system to fight infections. Vaccines
            not only safeguard your child but also help prevent the spread of diseases within the community, creating a
            safer environment for everyone. Early vaccination ensures your baby is protected during their most
            vulnerable years, giving you peace of mind and supporting their healthy development. At our clinic, we
            prioritize your child’s health by providing a comprehensive vaccination schedule tailored to their age and
            needs. Together, let’s build a healthier future for your little ones.
          </p>
          <h5 className='text-danger text-decoration-underline'>The Importance of Vaccination</h5>
          <p>
            Vaccination is one of the most effective ways to ensure your child’s long-term health and protect them from
            preventable diseases. From the earliest stages of life, vaccines prepare the immune system to recognize and
            combat harmful viruses and bacteria. By adhering to a proper immunization schedule, you not only protect
            your child but also contribute to the overall health of the community by reducing the risk of outbreaks.
            Vaccines are safe, rigorously tested, and essential for building a strong foundation for your child’s
            future. At our clinic, we are committed to guiding you through every step of your child’s vaccination
            journey with care and expertise.
          </p>
        </div>
        <div className='col-12 col-xxl-6'>
          <img className='w-100 my-4 rounded-1' src={Vacci} alt="Vaccination illustration" />
        </div>
      </div>

      <h1 className='text-center'>Vaccination Details</h1>
      <div className="row my-1">
        <div className="col-12 col-lg-6 vacci-list">
          <h4>Vaccination List</h4>
          {vaccinationData.map(({ age, vacciname, dose, availability }) => (
            <div key={vacciname} className="border my-2 p-2 text-center rounded bg-dark">
              <h6 className="text-danger">{age}</h6>
              <p className="text-light">
                {vacciname} - {dose} ({availability ? 'Available' : 'Not Available'})
              </p>
              <button
                className={`btn ${availability ? 'btn-success' : 'btn-primary'}`}
                onClick={() => updateVaccinationStatus(vacciname)}
                disabled={!availability}
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-6  comp-vacci-list my-2 text-center">
          <h4 className="text-decoration-underline">Completed Vaccinations</h4>
          {completedVaccines.length === 0 ? (
            <p>No vaccinations completed yet.</p>
          ) : (
            <div>
              {completedVaccines.map(({ age, vacciname }) => (
                <div key={vacciname} className='bg-dark mx-auto text-light d-flex justify-content-around rounded text-center w-75 p-1 my-2'>
                  <h5 className='text-danger'>{age}:</h5> <p>{vacciname}</p> 
                  <button
                    className='btn btn-warning'
                    onClick={() => removeVaccinationStatus(vacciname)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vaccination;
