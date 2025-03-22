const express = require('express');
const { bookSlot, checkSlotAvailability,markSlotAsDone, getBookedSlots,getAllSlotsForUser, getRecentSlot,getAppointmentDetails,getAllBookedSlotsForDate } = require('../controllers/slot');

const router = express.Router();

router.post('/bookslot', bookSlot);
router.put('/slotdone',markSlotAsDone);
router.get('/availability', checkSlotAvailability);
router.get('/booked', getBookedSlots);
router.get('/userslots',getAllSlotsForUser );
router.get('/getbookedslot',getAllBookedSlotsForDate);
router.get('/recentSlot',getRecentSlot);
router.get('/getAppointment', getAppointmentDetails)
module.exports = router;
