import React from 'react'
import { useEffect, useState } from "react";
import  "./index.css";
function Diet() {
  const [loading, setLoading] = useState(true);

  const [diet, setDiet] = useState(null);
  const [error, setError] = useState("");
  
  useEffect(() => {
    // Retrieve patientNo from localStorage
    const storedUser = JSON.parse(localStorage.getItem("User"));
    const patientNo = JSON.parse(localStorage.getItem("user"))?.patientNo;// Ensure we get patientNo
    console.log(patientNo);
    

    if (!patientNo) {
      setLoading(false);
      setError("No patient number found.");
      return;
    }

    const fetchDiet = async () => {
      try {
        const response = await fetch(`http://localhost:8000/diet/getDiet/${patientNo}`);
        if (!response.ok) {
          throw new Error("No diet found for this patient");
        }
        const data = await response.json();
        setDiet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiet();
  }, []);

  return (
    <div className='container border my-2 mx-auto text-center bg-dark'>
     <h1 className='text-light'> Recommended Diet</h1>
     <div className='bg-dark w-75 mx-auto rounded my-3 border'>
     <div class="accordion accordion-flush" id="accordionFlushExample">
     <div className="accordion-item">
  <h2 className="accordion-header">
    <button
      className="accordion-button fs-4 z-2 collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapsesix"
      aria-expanded="false"
      aria-controls="flush-collapsesix"
    >
      Doctor Recommended Diet
    </button>
  </h2>
  <div
    id="flush-collapsesix"
    className="accordion-collapse collapse"
    data-bs-parent="#accordionFlushExample"
  >
    <div className="accordion-body">
      {diet ? (
        <div>
          <div className='d-flex border justify-content-evenly'>
          <h5><strong className='text-danger'>Patient No:</strong> {diet.patientNo}</h5>
          <h5><strong className='text-danger'>Date:</strong> {new Date(diet.date).toLocaleDateString()}</h5>
          </div>
          
          <ul className=' text-center'>
           <h4 className=' text-danger '>Breakfast</h4>
           <li>{diet.breakfast.join("/  " )}</li>
          </ul>
          <ul className='text-center'>
           <h4 className='  text-danger '>Morning Snack</h4>
           <li>{diet.morningSnack.join("/ ")}</li>
          </ul>
          <ul className='text-center'>
           <h4 className='  text-danger '>Lunch</h4>
           <li>{diet.lunch.join("/ ")}</li>
          </ul>
          <ul className=' text-center'>
           <h4 className=' text-danger '>Evening Snack</h4>
           <li>{diet.eveningSnack.join("/ ")}</li>
          </ul>
          <ul className=' text-center'>
           <h4 className='  text-danger '>Dinner</h4>
           <li> {diet.dinner.join("/ ")}</li>
          </ul>
         
        </div>
      ) : (
        <p>Loading diet details...</p>
      )}
    </div>
  </div>
</div>

  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button fs-4  z-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       Infants(0--6 Months)
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-start">
      <h4 className='text-danger'>Primary Nutrition :</h4>
      <ul>
        <li className='my-1 d-flex'><b className='fw-3 text-success '>Breast Milk :</b> The ideal source of nutrition, providing all necessary nutrients and immunity-boosting antibodies.</li>
        <li className='my-1 d-flex'><b className='fw-3 text-success '>Formula Milk :</b> For non-breastfed babies, use iron-fortified infant formula recommended by a pediatrician.</li>
         
      </ul>
      <h4 className='text-danger'> Key Points:</h4>
      <ul>
        <li className='my-1 d-flex'>Avoid water, juice, or solid foods during this stage.</li>
        <li className='my-1 d-flex'>Feed on demand (every 2-3 hours).</li>
         
      </ul>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className= " fs-4 accordion-button  z-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      Infants (6–12 Months)
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body  text-start">
        <h4 className='text-danger'>Breakfast</h4>
        <ul> 
            <li>Breast Milk or Formula Milk</li>
            <li> Rice cereal with BM or FM</li>
        </ul>
        <h4 className='text-danger'>Mid-Morning Snack</h4>
        <ul> 
            <li>mashed banana</li>
            <li>mashed carrot</li>
            <li>mashed sweet potato</li>
            <li>mashed pear </li> 
        </ul>
        <h4 className='text-danger'>Lunch</h4>
        <ul> 
            <li>Mashed dal with boiled rice</li>
            <li>Mashed carrot and rice khichdi</li>
            <li>Moong dal khichdi with ghee</li>
            <li>Vegetable khichdi (carrot, peas, rice) </li> 
            <li>Lentil soup with soft rice </li> 
        </ul>
        <h4 className='text-danger'>Evening Snack</h4>
        <ul> 
            <li>Pureed apple</li>
            <li>Steamed and mashed pear</li>
            <li>Steamed and mashed sweet potato</li>
            <li>Steamed and mashed chikoo </li> 
            <li>Mashed pear with curd </li> 
        </ul>
        <h4 className='text-danger'>Dinner</h4>
        <ul> 
            <li>Ragi porridge with milk</li>
            <li>Pureed pumpkin with rice</li>
            <li>Mashed boiled potato</li>
            <li>Moong dal with carrot puree </li> 
            <li>Rice cereal with breast milk</li> 
        </ul>
        <h4 className='text-danger'>Foods To Avoid</h4>
        <ul> 
            
            <li>Honey (risk of botulism).</li>
            <li>Whole nuts or grapes (choking hazard).</li> 
            <li>Processed or packaged foods.</li> 
        </ul>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button class=" fs-4 accordion-button collapsed z-2" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      Toddlers (1–3 Years)
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-start">

      <h4 className='text-danger'>Breakfast</h4>
        <ul> 
            <li>Ragi porridge with banana</li>
            <li> Suji upma with vegetables</li>
            <li> Whole wheat dosa with chutney</li>
            <li> Poha with peanuts and veggies</li>
            <li> Pancakes made with ragi and jaggery</li>
            <li> Idli with ghee and coconut chutney</li>
        </ul>
        <h4 className='text-danger'>Mid-Morning Snack</h4>
        <ul> 
            <li>mashed papaya</li>
            <li>Sliced watermelon</li>
            <li>Mashed ripe mango</li>
            <li>mashed sweet potato</li>
            <li>Pomegranate seeds</li>
            <li>Pomegranate seeds</li>
            <li>mashed pear </li> 
        </ul>
        <h4 className='text-danger'>Lunch</h4>
        <ul> 
            <li>Rice with dal and ghee, carrot sabzi</li>
            <li>Chapati with mashed dal and ghee</li>
            <li>Jeera rice with curd, beetroot sabzi</li>
            <li>Rice with sambar, steamed beans </li> 
            <li> </li> 
            <li>Lemon rice with boiled egg </li> 
        </ul>
        <h4 className='text-danger'>Evening Snack</h4>
        <ul> 
            <li>Steamed idli with chutney</li>
            <li>Boiled potato sticks</li>
            <li>Paneer cubes</li>
            <li>Banana milkshake</li> 
            <li>Homemade fruit yogurt</li> 
        </ul>
        <h4 className='text-danger'>Dinner</h4>
        <ul> 
            <li>Vegetable daliya with moong dal</li>
            <li>Soft chapati with green gram curry</li>
            <li>Broken wheat khichdi with pumpkin</li>
            <li>Chapati with bottle gourd curry</li> 
            <li>Oats khichdi with mixed vegetables</li> 
        </ul>
        <h4 className='text-danger'>Key Notes:</h4>
     <p><b className='text-success'>Hydration:</b> Offer water regularly throughout the day. Coconut water or diluted fruit juices can be given occasionally.
<b className='text-success'>Ghee and Butter:</b> Include in meals in moderation to add healthy fats.
<b className='text-success'>Small Portions:</b> Toddlers have small appetites, so offer small, frequent meals.
<b className='text-success'>Finger Foods:</b> Offer items like steamed carrots, cucumber sticks, or soft paneer for self-feeding.
<b className='text-success'>Allergy Check:</b> Introduce new foods one at a time to monitor for allergies.
<b className='text-success'>Family Foods:</b> Toddlers can eat the same meals as the family, with mild seasoning.</p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button class=" fs-4 accordion-button  z-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
      Preschoolers (4–5 Years)
      </button>
    </h2>
    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-start">

      <h4 className='text-danger'>Breakfast</h4>
        <ul> 
            <li>Idli with coconut chutney</li>
            <li>Dosa with ghee and sambhar</li>
            <li>Upma with vegetables</li>
            <li> Moong dal cheela with chutney</li>
            <li> 	Paratha with curd and pickle</li> 
        </ul>
        <h4 className='text-danger'>Mid-Morning Snack</h4>
        <ul> 
            <li>mashed papaya</li>
            <li>Sliced watermelon</li>
            <li>Mashed ripe mango</li>
            <li>mashed sweet potato</li>
            <li>Pomegranate seeds</li>
            <li>Boiled egg or sprouts</li>
            <li>mashed pear </li> 
        </ul>
        <h4 className='text-danger'>Lunch</h4>
        <ul> 
            <li>Rice, dal, palak paneer, and cucumber salad</li>
            <li>Roti, aloo-methi sabzi, and carrot raita</li>
            <li>Rice, fish curry (or paneer curry) and salad</li>
            <li>Roti, vegetable khichdi, and beetroot raita </li> 
            <li> Rice, chicken curry (or soya curry) and salad</li> 
            <li>Rice, rajma, and spinach sabzi</li> 
        </ul>
        <h4 className='text-danger'>Evening Snack</h4>
        <ul> 
            <li>Roasted makhana and jaggery</li>
            <li>Homemade vegetable cutlets</li>
            <li>Paneer cubes</li>
            <li>Banana milkshake</li> 
            <li>Sweet potato slices or khakhra</li> 
            <li>Whole wheat biscuits and milk</li> 
        </ul>
        <h4 className='text-danger'>Dinner</h4>
        <ul> 
            <li>Chapati, mixed vegetable curry, and curd</li>
            <li>Rice, sambhar, and beetroot poriyal</li>
            <li>Chapati, bottle gourd curry, and curd</li>
            <li>Rice, rasam, and sautéed beans</li> 
            <li>Chapati, pumpkin sabzi, and curd</li> 
            <li>Roti, paneer bhurji, and green peas sabzi</li> 
        </ul>
        <h4 className='text-danger'>Key Notes:</h4>
     <p><b className='text-success'>Portion Sizes:</b>  Adjust based on the child’s appetite and activity level. Preschoolers typically eat smaller portions than adults.
<b className='text-success'>Hydration:</b> Encourage water between meals and avoid sugary drinks.
<b className='text-success'>Avoid Spicy Foods:</b> Use mild spices to suit the child’s palate.
<b className='text-success'>Allergies:</b> Replace allergenic ingredients with alternatives if needed (e.g., dairy-free curd for lactose-intolerant children). </p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button class=" fs-4 accordion-button  z-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
      School-Age Children (6–12 Years)
      </button>
    </h2>
    <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-start">

      <h4 className='text-danger'>Breakfast</h4>
        <ul> 
            <li>Vegetable upma with a glass of milk</li>
            <li>Vegetable upma with a glass of milk</li>
            <li>	Oats porridge with fruit pieces</li>
            <li> Dosa with coconut chutney and sambar</li>
            <li> Vegetable sandwich with milk</li> 
        </ul>
        <h4 className='text-danger'>Mid-Morning Snack</h4>
        <ul> 
            <li>  papaya</li>
            <li>Sliced watermelon</li>
            <li>  ripe mango</li>
            <li>Carrot sticks with hummus</li>
            <li>Pomegranate seeds</li>
            <li>Boiled egg or sprouts</li>
            <li>  pear </li> 
        </ul>
        <h4 className='text-danger'>Lunch</h4>
        <ul> 
            <li>Rice, chole (chickpea curry), cucumber salad</li>
            <li>Biryani with raita and salad</li>
            <li>Rice, fish curry (or paneer curry) and salad</li>
            <li>Roti, vegetable khichdi, and beetroot raita </li> 
            <li> Rice, chicken curry (or soya curry) and salad</li> 
            <li> Chapati, dal, palak paneer, and salad</li> 
        </ul>
        <h4 className='text-danger'>Evening Snack</h4>
        <ul> 
            <li>Roasted makhana and jaggery</li>
            <li>Homemade vegetable cutlets</li>
            <li>Sliced apple with peanut butter</li>
            <li>Banana milkshake</li> 
            <li>Fruit salad</li> 
            <li>Whole wheat biscuits and milk</li> 
        </ul>
        <h4 className='text-danger'>Dinner</h4>
        <ul> 
            <li>Chapati, mixed vegetable curry, and curd</li>
            <li>Grilled paneer with vegetable stir fry</li>
            <li>Chapati, bottle gourd curry, and curd</li>
            <li>Chicken stew with rice or whole wheat bread</li> 
            <li>Chapati, pumpkin sabzi, and curd</li> 
            <li>Roti, paneer bhurji, and green peas sabzi</li> 
        </ul>
        <h4 className='text-danger'>Key Notes:</h4>
     <p ><b className='text-success'>Proteins:</b> Include lentils (dal), chickpeas (chole), paneer, eggs, milk, yogurt, and chicken for protein intake.
        <b className='text-success'>Carbohydrates:</b> Include whole grains like brown rice, whole wheat chapati, oats, and idli.
        <b className='text-success'>Fruits & Vegetables:</b> Ensure a variety of fruits and vegetables are included to provide vitamins and minerals.
        <b className='text-success'>Healthy Fats:</b> Include nuts, seeds, and ghee or oil for healthy fats.
        <b className='text-success'>Dairy:</b> Incorporate milk, curd, and cheese to support calcium intake for bone health.</p>
      </div>
    </div>
  </div>
</div>
     </div>
    
    <div className='disclaimer   mx-auto  my-2 text-start '>
        <h1 className='text-danger'>Disclaimer:</h1>
        <p className='fs-5 text-light'>
The diet recommendations provided on this website are intended for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. While every effort has been made to provide accurate and reliable information, individual dietary needs may vary depending on a child’s age, health status, and specific nutritional requirements. It is always advisable to consult with a pediatrician or a registered dietitian before making any significant changes to your child's diet.

The meal plans shared here are general suggestions and may not be suitable for all children, especially those with food allergies, intolerances, or specific medical conditions. Parents and caregivers should monitor their child's dietary needs and preferences and make adjustments as needed.</p>
    </div>

    </div>
  )
} 
export default Diet
