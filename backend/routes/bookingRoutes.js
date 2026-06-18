const express = require('express');
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', async (req, res) => res.status(201).json(await Booking.create(req.body)));
router.get('/', protect, admin, async (req, res) => res.json(await Booking.find({})));
router.put('/:id', protect, admin, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    booking.status = req.body.status || booking.status;
    res.json(await booking.save());
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});
router.delete('/:id', protect, admin, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking removed' });
});

module.exports = router;