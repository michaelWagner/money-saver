'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('friends', {
      user_id_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Refers to the 'users' table
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      user_id_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Refers to the 'users' table
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add a composite unique constraint to ensure that a friendship between the same users is not duplicated
    await queryInterface.addConstraint('friends', {
      fields: ['user_id_1', 'user_id_2'],
      type: 'unique',
      name: 'unique_friendship'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('friends');
  }
};
