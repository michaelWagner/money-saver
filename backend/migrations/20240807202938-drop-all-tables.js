'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
  },

  down: async (queryInterface, Sequelize) => {
    // If necessary, add logic to recreate tables
  }
};
