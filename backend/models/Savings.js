const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Savings = sequelize.define('Savings', {
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
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
  Savings.belongsToMany(models.User, { through: models.UserSavings, as: 'Collaborators', foreignKey: 'savings_id' });
};

module.exports = Savings;
