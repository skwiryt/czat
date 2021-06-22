const express = require('express');
const path = require('path');
const app = express();

const messages = [];

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('/client/index.html');
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});