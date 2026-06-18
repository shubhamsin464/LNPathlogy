const express = require('express');
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => res.json(await Package.find({})));
router.post('/', protect, admin, async (req, res) => res.status(201).json(await Package.create(req.body)));
router.delete('/:id', protect, admin, async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: 'Package removed' });
});

module.exports = router;