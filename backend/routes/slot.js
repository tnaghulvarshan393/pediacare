const express = require('express');
const { getSlots, bookSlot } = require('../controllers/slot');
const router = express.Router();

router.get('/getSlots', getSlots);
router.post('/bookSlot', bookSlot); 
module.exports = router;
