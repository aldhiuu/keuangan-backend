const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Tambah transaksi
router.post('/', (req, res) => {
  const { userId, type, description, amount, date } = req.body;

  // Log untuk debug
  console.log("📥 REQUEST TRANSAKSI:", req.body);

  // Validasi field
  if (!userId || !type || !amount || !description || !date) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }

  const query = `
    INSERT INTO transactions (user_id, type, description, amount, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [userId, type, description, amount, date], (err, result) => {
    if (err) {
      console.error("❌ Gagal simpan transaksi:", err.sqlMessage || err);
      return res.status(500).json({ error: "Gagal menyimpan transaksi ke database." });
    }
    res.status(201).json({ message: "✅ Transaksi berhasil disimpan." });
  });
});

// ✅ Ambil semua transaksi milik user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT * FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Gagal ambil transaksi:", err.sqlMessage || err);
      return res.status(500).json({ error: "Gagal mengambil data transaksi." });
    }
    res.json(results);
  });
});

// ✅ Update transaksi
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { type, description, amount, date } = req.body;

  const query = `
    UPDATE transactions
    SET type = ?, description = ?, amount = ?, date = ?
    WHERE id = ?
  `;

  db.query(query, [type, description, amount, date, id], (err, result) => {
    if (err) {
      console.error("❌ Gagal update transaksi:", err.sqlMessage || err);
      return res.status(500).json({ error: "Gagal update transaksi." });
    }
    res.json({ message: "✅ Transaksi berhasil diperbarui." });
  });
});

// ✅ Hapus transaksi
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM transactions WHERE id = ?`;

  db.query(query, [id], (err) => {
    if (err) {
      console.error("❌ Gagal hapus transaksi:", err.sqlMessage || err);
      return res.status(500).json({ error: "Gagal menghapus transaksi." });
    }
    res.json({ message: "🗑️ Transaksi berhasil dihapus." });
  });
});

module.exports = router;
