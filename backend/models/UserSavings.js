const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Savings = require('./Savings');

const UserSavings = sequelize.define('UserSavings', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  savings_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Savings,
      key: 'id',
    },
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
  tableName: 'usersavings',
});

// Define associations
User.belongsToMany(Savings, { through: 'usersavings', foreignKey: 'user_id', as: 'sharedSavings' });
Savings.belongsToMany(User, { through: 'usersavings', foreignKey: 'savings_id', as: 'collaborators' });

module.exports = UserSavings;
