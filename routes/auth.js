const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// ✅ REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log("Register request:", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi." });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash],
      (err, result) => {
        if (err) {
          console.error("DB Error:", err);
          return res.status(500).json({ message: "Username sudah digunakan atau error DB." });
        }
        res.json({ message: "✅ Pendaftaran berhasil! Silakan login." });
      }
    );
  } catch (err) {
    console.error("Hash error:", err);
    res.status(500).json({ message: "❌ Terjadi kesalahan saat memproses password." });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "❌ Terjadi kesalahan saat login." });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "⚠️ User tidak ditemukan." });
      }

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "❌ Password salah." });
      }

      // ✅ Kirim data user minimal (bisa ditambah nanti)
      res.json({ id: user.id, name: user.username });
    }
  );
});

module.exports = router;
