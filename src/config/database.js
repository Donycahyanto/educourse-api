const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'educourse_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// Cek koneksi ke database saat aplikasi dijalankan
sequelize
  .authenticate()
  .then(() =>
    console.log('✅ Berhasil terhubung ke Database MySQL via Sequelize')
  )
  .catch((err) => console.error('❌ Koneksi Database Gagal:', err.message));

module.exports = sequelize;
