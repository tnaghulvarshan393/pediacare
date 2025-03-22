import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';

function Personal() {
const[error,setError]= useState("");
const navigate= useNavigate();

  const [formData, setFormData] = useState({
    childName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    phone: '',
    height: '',
    weight: '',
    address: '',
  });

  // Load data from localStorage when the component is mounted
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setFormData({
        childName: userData.name || '',
        fatherName: userData.fatherName || '',
        motherName: userData.motherName || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        phone: userData.mobile || '',
        height: userData.height || '',
        weight: userData.weight || '',
        address: userData.address || '',
      });
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission to handle it manually
  
    const userId = JSON.parse(localStorage.getItem('user'))?._id; // Access _id from localStorage
    console.log('LocalStorage User:', JSON.parse(localStorage.getItem('user')));
    console.log('Payload being sent:', formData);
  
    if (!userId) {
      setError('User not logged in or invalid user data');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/patient/updatePatient/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      console.log('Response from server:', responseData);
  
      if (response.ok) {
        const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        console.log('Local storage updated:', updatedUser);
        alert('Patient data updated successfully!');
      } else {
        setError(responseData.error || 'Failed to update');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }

    navigate('/Home');
  };
  
  

  return (
    <div className='my-1 container border mx-auto text-center'>
      <h1 className='my-4'>PERSONAL INFO</h1>
      <form onSubmit={handleSubmit} className='w-75 mx-auto rounded bg-dark p-4'>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>Child Name</span>
          <input
            type='text'
            className='form-control'
            name='childName'
            value={formData.childName}
            onChange={handleChange}
            placeholder='Name'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>Father Name</span>
          <input
            type='text'
            className='form-control'
            name='fatherName'
            value={formData.fatherName}
            onChange={handleChange}
            placeholder='Father name'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>Mother Name</span>
          <input
            type='text'
            className='form-control'
            name='motherName'
            value={formData.motherName}
            onChange={handleChange}
            placeholder='Mother name'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>DOB</span>
          <input
  type='date'
  className='form-control'
  name='dob'
  value={formData.dob}
  onChange={handleChange}
/>
        </div>
        <div className='input-group mb-3'>
          <label className='input-group-text' htmlFor='genderSelect'>Gender</label>
          <select
            className='form-select'
            name='gender'
            id='genderSelect'
            value={formData.gender}
            onChange={handleChange}
          >
            <option value=''>Choose...</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>Phone no</span>
          <input
            type='text'
            className='form-control'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Mobile Number'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>Height</span>
          <input
            type='text'
            className='form-control'
            name='height'
            value={formData.height}
            onChange={handleChange}
            placeholder='In cm'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>Weight</span>
          <input
            type='text'
            className='form-control'
            name='weight'
            value={formData.weight}
            onChange={handleChange}
            placeholder='In lbs'
          />
        </div>
        <div className='input-group'>
          <span className='input-group-text'>Residential Address</span>
          <textarea
            className='form-control'
            name='address'
            value={formData.address}
            onChange={handleChange}
            aria-label='With textarea'
          />
        </div>
        <button className='btn btn-primary my-3 w-25'>Submit</button>
        {error && <p className='text-danger'>{error}</p>}
      </form>
    </div>
  );
}

export default Personal;
