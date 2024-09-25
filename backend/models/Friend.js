const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Friend = sequelize.define('Friend', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // Use the model name as it is defined in the database
      key: 'id',
    },
  },
  friend_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // Use the model name as it is defined in the database
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending', // 'pending', 'accepted'
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
  tableName: 'friends'
});

Friend.associate = models => {
  Friend.belongsTo(models.User, { foreignKey: 'user_id' });
  Friend.belongsTo(models.User, { foreignKey: 'friend_id' });
};

module.exports = Friend;
