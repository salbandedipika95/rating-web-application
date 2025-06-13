const express = require('express');
const router = express.Router();
const { User, Store, Rating } = require('../models');
const verifyToken = require('../middleware/auth');

// Admin middleware
const adminOnly = verifyToken(['admin']);

// Get dashboard stats
router.get('/user', adminOnly, async (req, res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();
  res.json({ totalUsers: users, totalStores: stores, totalRatings: ratings });
});

// Add a new user
router.post('/users', adminOnly, async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const newUser = await User.create({ name, email, password, address, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a store
router.post('/stores', adminOnly, async (req, res) => {
  const { name, address, ownerId } = req.body;
  try {
    const store = await Store.create({ name, address, ownerId });
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get users list with optional filters
router.get('/users', adminOnly, async (req, res) => {
  const { name, email, address, role } = req.query;
  const where = {};
  if (name) where.name = name;
  if (email) where.email = email;
  if (address) where.address = address;
  if (role) where.role = role;
  const users = await User.findAll({ where });
  res.json(users);
});

// Get stores list
router.get('/stores', adminOnly, async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating }],
  });
  res.json(stores);
});

module.exports = router;

