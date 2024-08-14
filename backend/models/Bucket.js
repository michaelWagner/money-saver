const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bucket extends Model {}

Bucket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    totalSavings: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Bucket',
  }
);

module.exports = Bucket;
