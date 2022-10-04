const express = require('express');
const app = express();

const middleware = require('../src/routes');
app.use('/popular', middleware);
app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;
