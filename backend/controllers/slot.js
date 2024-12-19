const SlotModel = require('../models/slot');

const getSlots = async (req, res) => {
    const { date } = req.query;
    const parsedDate = new Date(date);
    if (!date || isNaN(parsedDate)) {
        return res.status(400).json({ error: 'Invalid or missing date parameter' });
    }

    try {
        const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));
        const slots = await SlotModel.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });
        res.status(200).json({ slots });
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
};

const bookSlot = async (req, res) => {
    const { name, parentName, age, session, service, date, pId, slot } = req.body;

    try {
        const existingSlot = await SlotModel.findOne({ date, slot });
        if (existingSlot && existingSlot.bookedBy) {
            return res.status(400).json({ error: 'Slot already booked' });
        }
        const newSlot = new SlotModel({ name, parentName, age, session, service, date, pId, slot });
        await newSlot.save();
        res.status(201).json(newSlot);
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ error: 'Failed to book slot', details: error.message });
    }
};

module.exports = { getSlots, bookSlot };
