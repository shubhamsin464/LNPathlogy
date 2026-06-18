const express = require('express');
const router = express.Router();
const { ContactRequest } = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

// Submit a contact request (Public)
router.post('/', async (req, res) => {
    try {
        const contact = await ContactRequest.create(req.body);
        res.status(201).json({ message: 'Request sent successfully', contact });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Get all contact requests (Admin)
router.get('/', protect, async (req, res) => {
    try {
        let contacts = await ContactRequest.find({});
        contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update status (Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const contact = await ContactRequest.findByIdAndUpdate(req.params.id, { status: req.body.status });
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
