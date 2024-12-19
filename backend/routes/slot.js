const express = require('express');
const { bookSlot, getSlots } = require('../controllers/slot');
const router = express.Router();

router.post('/slot', bookSlot);
router.get('/slots', getSlots);

module.exports = router;
