const express = require('express');
const cors = require('cors'); // 👈 1. Import package cors
require('dotenv').config();

const courseRoutes = require('./src/routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 👈 2. Gunakan middleware CORS (harus dipasang SEBELUM route)
app.use(cors());

app.use(express.json());

// Main Route untuk API Course
app.use('/course', courseRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
