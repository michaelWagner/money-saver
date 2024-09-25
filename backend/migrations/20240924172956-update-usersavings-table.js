'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('userSavings', 'usersavings');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('usersavings', 'userSavings');
  }
};
