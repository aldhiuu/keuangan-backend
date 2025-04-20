const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // kosong kalau pakai XAMPP
  database: 'keuangan_db' // ganti sesuai nama databasenya
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err);
  } else {
    console.log('MySQL terkoneksi.');
  }
});

module.exports = db;
