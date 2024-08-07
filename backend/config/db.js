const { Pool } = require('pg');

const pool = new Pool({
  user: 'moneysaveradmin',
  host: 'localhost',
  database: 'moneysaverdb',
  password: 'moneysaveradmin_password',
  port: 5432,
});

module.exports = pool;