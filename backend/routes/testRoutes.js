const express = require('express');
const Test = require('../models/Test');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => res.json(await Test.find({})));
router.post('/', protect, admin, async (req, res) => res.status(201).json(await Test.create(req.body)));
router.delete('/:id', protect, admin, async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.json({ message: 'Test removed' });
});

module.exports = router;