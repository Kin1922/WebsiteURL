const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const links = {};

app.post('/shorten', express.json(), (req, res) => {
  const id = Math.random().toString(36).substr(2,5);
  links[id] = req.body.url;
  res.json({ short: `${req.headers.host}/${id}` });
});

app.get('/:id', (req, res) => {
  const url = links[req.params.id];
  if (url) return res.redirect(url);
  res.status(404).send('Link gak ada bro');
});

app.listen(port, () => console.log(`Running on port ${port}`));