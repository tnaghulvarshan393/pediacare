const express = require("express");
const router = express.Router();
const { addOrUpdateDiet, getDiet, deleteDiet } = require("../controllers/diet");

router.post("/addOrUpdateDiet", addOrUpdateDiet);
router.get("/getDiet/:patientId", getDiet);
router.delete("/deleteDiet/:patientId", deleteDiet);

module.exports = router;
