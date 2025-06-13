const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // ← change from postgres to mysql
  }
);

const User = require('./User')(sequelize, DataTypes);
const Store = require('./Store')(sequelize, DataTypes);
const Rating = require('./Rating')(sequelize, DataTypes);

User.hasMany(Rating);
Rating.belongsTo(User);
Store.hasMany(Rating);
Rating.belongsTo(Store);
Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
User.hasMany(Store, { foreignKey: 'ownerId' });

module.exports = { sequelize, User, Store, Rating };