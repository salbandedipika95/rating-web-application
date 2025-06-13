const express = require('express');
const router = express.Router();
const { Store, Rating } = require('../models');
const verifyToken = require('../middleware/auth');

const userOnly = verifyToken(['user']);

router.get('/stores', userOnly, async (req, res) => {
  try {
    const stores = await Store.findAll({ include: [Rating] });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/rate', userOnly, async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  const [userRating] = await Rating.upsert({ storeId, userId, rating });
  const allRatings = await Rating.findAll({ where: { storeId } });
  const avg = allRatings.reduce((a, r) => a + r.rating, 0) / allRatings.length;
  await Store.update({ averageRating: avg }, { where: { id: storeId } });

  res.json({ success: true });
});

module.exports = router;


