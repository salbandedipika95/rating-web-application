module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Store', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    averageRating: { type: DataTypes.FLOAT, defaultValue: 0 }
  });
};