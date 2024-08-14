const { Pool } = require('pg');

const pool = new Pool({
  user: 'mikeywagner',
  host: 'localhost',
  database: 'money_saver_db',
  password: 'admin123',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

module.exports = pool;