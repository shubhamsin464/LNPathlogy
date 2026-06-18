const express = require('express');
const router = express.Router();
const { Testimonial } = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

// Get all approved testimonials (Public)
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ approved: true });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all testimonials (Admin)
router.get('/all', protect, async (req, res) => {
    try {
        const testimonials = await Testimonial.find({});
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a testimonial (Admin)
router.post('/', protect, async (req, res) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Delete testimonial (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (testimonial) {
            res.json({ message: 'Testimonial removed' });
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
