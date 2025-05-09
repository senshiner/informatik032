
require('dotenv').config();

const { Pool } = require('pg');

// Konfigurasi pool koneksi untuk Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Export fungsi query untuk digunakan di tempat lain
module.exports = {
  query: (text, params) => pool.query(text, params),
};
