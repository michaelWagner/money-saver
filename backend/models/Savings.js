'use strict';
module.exports = (sequelize, DataTypes) => {
  const Savings = sequelize.define('Savings', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Ensure this matches your actual table name
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    total: {
      type: DataTypes.DECIMAL(14, 2),
      defaultValue: 0.00,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'savings', // Ensure this matches your actual table name
    timestamps: false, // Set to true if you want Sequelize to handle created_at and updated_at
  });

  Savings.associate = function(models) {
    // Associating Savings with User
    Savings.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Savings;
};
