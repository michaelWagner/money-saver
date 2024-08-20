// backend/config/connection.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'money_saver_db',
  username: 'mikeywagner',
  password: 'admin123',
  host: 'localhost',
  dialect: 'postgres',
  logging: true
});

module.exports = sequelize;