import React, { useEffect, useState } from 'react';
import "./index.css";
import axios from 'axios';

function Slots() {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch slots for the current date
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/slot/getbookedslot?date=${date}`);
        setSlots(response.data.slots);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching slots');
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  return (
    <div className="container border mx-auto">
      <div className="w-75 text-light mx-auto border d-flex justify-content-evenly bg-secondary p-2">
        <h3>Slots for Today</h3>
        <h3>Date: {date}</h3>
      </div>

      <div className="w-75 mx-auto border bg-dark text-light">
        {loading ? (
          <div className="text-center p-4">Loading slots...</div>
        ) : error ? (
          <div className="text-center text-danger p-4">{error}</div>
        ) : slots.length > 0 ? (
          slots.map((slot,i) => (
            <div
            key={slot._id}
            className={`p-2 border my-2 d-flex justify-content-between slot-display rounded mx-auto ${slot.done ? 'bg-success' : ''}`}
          >
            <h2>{i+1}</h2>
            <p><strong className='text-danger'>Appointment Id:</strong> {slot.appId}</p>
            <p><strong className='text-danger'>Timing:</strong> {slot.slot}</p>
            <p><strong className='text-danger'>Session:</strong> {slot.session}</p>
            <p><strong className='text-danger'>Service:</strong> {slot.service}</p>
            <p><strong className='text-danger'>Name:</strong> {slot.name} ({slot.parentName})</p>
          </div>
          
          ))
        ) : (
          <div className="text-center p-4">No slots booked for today.</div>
        )}
      </div>
    </div>
  );
}

export default Slots;
