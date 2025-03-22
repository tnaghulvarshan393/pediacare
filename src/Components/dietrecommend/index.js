import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DietRecommend() {
  const [patientNo, setPatientNo] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [''],
    midMorningSnack: [''],
    lunch: [''],
    eveningSnack: [''],
    dinner: [''],
  });

  // Reset meals when patientNo changes
  useEffect(() => {
    if (patientNo === '') {
      setMeals({
        breakfast: [''],
        midMorningSnack: [''],
        lunch: [''],
        eveningSnack: [''],
        dinner: [''],
      });
    }
  }, [patientNo]);

  // Add a new dish to the specified meal type
  const addDish = (mealType) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: [...prevMeals[mealType], ''],
    }));
  };

  // Remove a dish from the specified meal type
  const removeDish = (mealType, index) => {
    const updatedDishes = meals[mealType].filter((_, i) => i !== index);
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: updatedDishes,
    }));
  };

  // Handle input change for a specific dish in a specific meal type
  const handleDishChange = (mealType, index, value) => {
    const updatedMeals = { ...meals };
    updatedMeals[mealType][index] = value;
    setMeals(updatedMeals);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/diet/addOrUpdateDiet', {
        patientNo,
        breakfast: meals.breakfast,
        midMorningSnack: meals.midMorningSnack,
        lunch: meals.lunch,
        eveningSnack: meals.eveningSnack,
        dinner: meals.dinner,
      });
      alert(response.data.message); // Alert on success
    } catch (error) {
      alert('Error: ' + error.response?.data?.error || 'Something went wrong');
    }
    setPatientNo("");
  };

  return (
    <div className="container border text-center">
      <h3 className="mx-auto">Recommend The Diet for the Patient</h3>
      <form className="w-75 mx-auto border" onSubmit={handleSubmit}>
        <div className="input-group w-50 mx-auto flex-nowrap my-4">
          <span className="input-group-text" id="addon-wrapping">
            <i className="bi text-dark bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter patient ID"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={patientNo}
            onChange={(e) => setPatientNo(e.target.value)}
          />
        </div>

        {/* Meal Types: Iterate over each meal type */}
        {['breakfast', 'midMorningSnack', 'lunch', 'eveningSnack', 'dinner'].map((mealType) => (
          <div key={mealType}>
            <div className="w-50 mx-auto text-center">
              <p className="fs-4">Add dish for {mealType.replace(/([A-Z])/g, ' $1')} 
                <i className="text-dark bi bi-plus-circle" onClick={() => addDish(mealType)}></i>
              </p>
            </div>
            {meals[mealType].map((dish, index) => (
              <div className="input-group w-50 mx-auto flex-nowrap" key={index}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Add dish for ${mealType}`}
                  value={dish}
                  onChange={(e) => handleDishChange(mealType, index, e.target.value)}
                />
                {meals[mealType].length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeDish(mealType, index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>

        {/* Display the meals and dishes in a table format */}
        <table className="border mx-auto my-3">
          <thead>
            <tr>
              <th className="border p-3">Breakfast</th>
              <th className="border p-3">Mid-Morning Snack</th>
              <th className="border p-3">Lunch</th>
              <th className="border p-3">Evening Snack</th>
              <th className="border p-3">Dinner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {['breakfast', 'midMorningSnack', 'lunch', 'eveningSnack', 'dinner'].map((mealType) => (
                <td key={mealType} className="border p-3">
                  <ul>
                    {meals[mealType].map((dish, index) => (
                      <li key={index}>{dish}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default DietRecommend;
