const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FriendRequest extends Model {}

FriendRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // 'pending', 'accepted', 'rejected'
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'FriendRequest',
  }
);

module.exports = FriendRequest;
