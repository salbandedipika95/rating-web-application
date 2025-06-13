module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Rating', {
    rating: { type: DataTypes.INTEGER, allowNull: false }
  });
};