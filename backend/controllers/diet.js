const Diet = require('../models/diet');  // Correct import

const addOrUpdateDiet = async (req, res) => {
  try {
    const { patientNo, breakfast, morningSnack, lunch, eveningSnack, dinner } = req.body;

    let diet = await Diet.findOne({ patientNo });

    if (diet) {
      // Update existing diet
      diet.breakfast = breakfast || diet.breakfast;
      diet.morningSnack = morningSnack || diet.morningSnack;
      diet.lunch = lunch || diet.lunch;
      diet.eveningSnack = eveningSnack || diet.eveningSnack;
      diet.dinner = dinner || diet.dinner;
      await diet.save();
    } else {
      // Create new diet entry
      diet = new Diet({ patientNo, breakfast, morningSnack, lunch, eveningSnack, dinner });
      await diet.save();
    }

    res.status(200).json({ message: "Diet updated successfully", diet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDiet = async (req, res) => {
    try {
      const { patientId } = req.params;
      // Change the query to use `patientNo` instead of `patientId`
      const diet = await Diet.findOne({ patientNo: patientId });
  
      if (!diet) {
        return res.status(404).json({ message: "No diet found for this patient" });
      }
  
      res.status(200).json(diet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const deleteDiet = async (req, res) => {
  try {
    const { patientNo } = req.params;
    await Diet.findOneAndDelete({ patientNo });
    res.status(200).json({ message: "Diet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addOrUpdateDiet,
  getDiet,
  deleteDiet,
};
