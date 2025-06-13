const express = require('express');
const router = express.Router();
const { Store, Rating, User } = require('../models');
const verifyToken = require('../middleware/auth');

const ownerOnly = verifyToken(['store-owner']);

// Owner dashboard
router.get('/owner', ownerOnly, async (req, res) => {
  const ownerId = req.user.id;
  const stores = await Store.findAll({ where: { ownerId }, include: Rating });
  const output = await Promise.all(stores.map(async (store) => {
    const ratings = await Rating.findAll({ where: { storeId: store.id }, include: User });
    return {
      store: store.name,
      averageRating: store.averageRating,
      users: ratings.map(r => ({ name: r.User.name, rating: r.rating }))
    };
  }));
  res.json(output);
});

module.exports = router;