const express = require('express');
const router = express.Router();
const { Report } = require('../config/db');
const { protect } = require('../middleware/authMiddleware');

// Patient download report (Public)
router.post('/download', async (req, res) => {
    const { patientId, mobileNumber } = req.body;
    try {
        const report = await Report.findOne({ patientId, mobileNumber });
        if (report) {
            res.json({ reportUrl: report.reportUrl, testName: report.testName, patientName: report.patientName });
        } else {
            res.status(404).json({ message: 'Report not found with provided details' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add report (Admin)
router.post('/', protect, async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Get all reports (Admin)
router.get('/', protect, async (req, res) => {
    try {
        let reports = await Report.find({});
        reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
