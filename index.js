const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing body JSON

// Routes
const authRoutes = require('./routes/auth');
const transRoutes = require('./routes/transactions');

app.use('/api/auth', authRoutes);         // Misal: POST /api/auth/register
app.use('/api/transactions', transRoutes); // Misal: GET /api/transactions/:userId

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Server API Keuangan Berjalan!');
});

// Handler jika route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: '🔍 Route tidak ditemukan.' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
