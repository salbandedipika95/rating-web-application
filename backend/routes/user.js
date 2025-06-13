// const express = require('express');
// const router = express.Router();
// const { Store, Rating } = require('../models');
// const verifyToken = require('../middleware/auth');

// const userOnly = verifyToken(['user']);

// // Get all stores
// router.get('/stores', userOnly, async (req, res) => {
//   const stores = await Store.findAll({ include: Rating });
//   res.json(stores);
// });

// // Submit or update rating
// router.post('/rate', userOnly, async (req, res) => {
//   const { storeId, rating } = req.body;
//   const userId = req.user.id;
//   const [userRating, created] = await Rating.upsert({ storeId, userId, rating });
//   // Update average rating
//   const allRatings = await Rating.findAll({ where: { storeId } });
//   const avg = allRatings.reduce((acc, r) => acc + r.rating, 0) / allRatings.length;
//   await Store.update({ averageRating: avg }, { where: { id: storeId } });
//   res.json({ success: true });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { Store, Rating } = require('../models');
const verifyToken = require('../middleware/auth');

const userOnly = verifyToken(['user']);

// ✅ GET /api/user/stores — all stores with ratings
router.get('/stores', userOnly, async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [Rating],
    });
    res.json(stores);
  } catch (err) {
    console.error('Error fetching stores:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
