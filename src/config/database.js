const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'educourse_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Cek koneksi saat server dinyalakan
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Koneksi Database Gagal:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke Database MySQL');
    connection.release();
  }
});

module.exports = db.promise(); // Menggunakan versi Promise agar async/await lebih bersih
