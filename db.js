const mysql = require('mysql2');
require('dotenv').config(); // ini wajib agar .env bisa dibaca

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err);
  } else {
    console.log('MySQL terkoneksi.');
  }
});

module.exports = db;
