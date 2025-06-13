module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
  });
};