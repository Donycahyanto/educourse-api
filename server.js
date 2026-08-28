const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const uploadMiddleware = require('./src/middlewares/uploadMiddleware');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', courseRoutes);

// Endpoint Upload Gambar
app.post('/api/upload', uploadMiddleware.single('file'), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
  res.json({
    message: 'Upload file berhasil',
    filePath: `/uploads/${req.file.filename}`,
  });
});

const PORT = process.env.PORT || 3000;

// Sinkronisasi Database Otomatis via Sequelize
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Database & Tables synchronized successfully.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ Failed to sync database:', err.message));
