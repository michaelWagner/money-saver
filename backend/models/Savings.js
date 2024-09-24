const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

const Savings = sequelize.define('Savings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
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
  tableName: 'savings'
});

Savings.associate = models => {
  Savings.belongsTo(models.User, { foreignKey: 'user_id', as: 'Owner' }); // Direct ownership
  Savings.belongsToMany(User, { through: 'usersavings', foreignKey: 'savings_id', as: 'ownerCollaborators' });
};

module.exports = Savings;
