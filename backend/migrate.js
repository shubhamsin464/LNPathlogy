const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir);

// Models
fs.writeFileSync(path.join(modelsDir, 'User.js'), `const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ email: { type: String, required: true, unique: true }, password: { type: String, required: true }, isAdmin: { type: Boolean, default: false } }, { timestamps: true });
module.exports = mongoose.model('User', userSchema);`);

fs.writeFileSync(path.join(modelsDir, 'Test.js'), `const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({ name: { type: String, required: true }, price: { type: Number, required: true }, description: { type: String } }, { timestamps: true });
module.exports = mongoose.model('Test', testSchema);`);

fs.writeFileSync(path.join(modelsDir, 'Package.js'), `const mongoose = require('mongoose');
const packageSchema = new mongoose.Schema({ name: { type: String, required: true }, price: { type: Number, required: true }, description: { type: String }, tests: [{ type: String }] }, { timestamps: true });
module.exports = mongoose.model('Package', packageSchema);`);

fs.writeFileSync(path.join(modelsDir, 'Booking.js'), `const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({ name: { type: String, required: true }, phone: { type: String, required: true }, email: { type: String }, date: { type: String, required: true }, time: { type: String, required: true }, address: { type: String, required: true }, tests: [{ type: String }], packages: [{ type: String }], status: { type: String, default: 'Pending' } }, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);`);

// Server.js
fs.writeFileSync(path.join(__dirname, 'server.js'), `const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`);

// Auth Middleware
fs.writeFileSync(path.join(__dirname, 'middleware', 'authMiddleware.js'), `const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) res.status(401).json({ message: 'Not authorized, no token' });
};
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else res.status(401).json({ message: 'Not authorized as an admin' });
};
module.exports = { protect, admin };`);

// Routes Rewrite
fs.writeFileSync(path.join(__dirname, 'routes', 'authRoutes.js'), `const express = require('express');
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

module.exports = router;`);

fs.writeFileSync(path.join(__dirname, 'routes', 'testRoutes.js'), `const express = require('express');
const Test = require('../models/Test');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => res.json(await Test.find({})));
router.post('/', protect, admin, async (req, res) => res.status(201).json(await Test.create(req.body)));
router.delete('/:id', protect, admin, async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.json({ message: 'Test removed' });
});

module.exports = router;`);

fs.writeFileSync(path.join(__dirname, 'routes', 'packageRoutes.js'), `const express = require('express');
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => res.json(await Package.find({})));
router.post('/', protect, admin, async (req, res) => res.status(201).json(await Package.create(req.body)));
router.delete('/:id', protect, admin, async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: 'Package removed' });
});

module.exports = router;`);

fs.writeFileSync(path.join(__dirname, 'routes', 'bookingRoutes.js'), `const express = require('express');
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

module.exports = router;`);

console.log('Migration complete');
