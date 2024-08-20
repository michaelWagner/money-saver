const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'users'
});

User.associate = models => {
  User.hasMany(models.Item, { foreignKey: 'user_id' });
  User.hasMany(models.Savings, { foreignKey: 'user_id' }); // Direct ownership
  User.belongsToMany(models.Savings, { through: models.UserSavings, as: 'CollaboratedSavings', foreignKey: 'user_id' });
  User.hasMany(models.Friend, { foreignKey: 'user_id' });
  User.hasMany(models.Friend, { foreignKey: 'friend_id' });
};

User.associate = models => {
};
module.exports = User;
