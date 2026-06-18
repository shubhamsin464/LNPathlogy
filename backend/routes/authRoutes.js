const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.json({ _id: user._id, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

router.post('/setup', async (req, res) => {
  const adminExists = await User.findOne({ email: 'admin@lnpathology.com' });
  if (adminExists) return res.status(400).json({ message: 'Admin already exists' });
  const admin = await User.create({ email: 'admin@lnpathology.com', password: 'password123', isAdmin: true });
  res.status(201).json({ message: 'Admin created' });
});

module.exports = router;