const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const links = {};

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/shorten', (req, res) => {
  const id = Math.random().toString(36).substr(2, 5);
  links[id] = req.body.url;
  const short = `${req.protocol}://${req.get('host')}/${id}`;
  res.json({ short });
});

app.get('/:id', (req, res) => {
  const url = links[req.params.id];
  if (url) return res.redirect(url);
  res.status(404).send('Link tidak ditemukan');
});

app.listen(port, () => {
  console.log(`Server jalan di port ${port}`);
});