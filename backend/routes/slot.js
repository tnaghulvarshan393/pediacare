const express = require('express');
const { bookSlot, checkSlotAvailability, getBookedSlots } = require('../controllers/slot');

const router = express.Router();

router.post('/bookslot', bookSlot);
router.get('/availability', checkSlotAvailability);
router.get('/booked', getBookedSlots);

module.exports = router;
