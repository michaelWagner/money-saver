module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('savings', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('savings', 'title');
  }
};