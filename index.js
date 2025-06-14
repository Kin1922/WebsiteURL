const express = require('express');
const app = express();
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const BASE_URL = "https://your-app-name.up.railway.app"; // Ganti pakai URL Railway kamu

app.use(express.json());

const db = {}; // Simpan URL pendek (sederhana, belum pakai database)

app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'URL tidak boleh kosong' });
  }

  const shortId = crypto.randomBytes(3).toString('hex');
  db[shortId] = originalUrl;

  const shortUrl = `${BASE_URL}/${shortId}`;
  res.json({ shortUrl });
});

app.get('/:id', (req, res) => {
  const originalUrl = db[req.params.id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Link tidak ditemukan');
  }
});

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});