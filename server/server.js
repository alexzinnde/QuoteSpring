require('dotenv').config();
require('./database');

const path = require('path');
const axios = require('axios');
const express = require('express');

const quotes = require('./database/controllers/quotes');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// ========== QUOTE ROUTES ================
app.get('/api/quotes', (req, res) => {
  quotes.getQuotes()
    .then((allQuotes) => res.send(allQuotes));
});

app.post('/api/quotes', (req, res) => {
  quotes.saveQuote(req.body).save((err) => {
    if (err) {
      res.status(500).send('Error saving to the DB \n' + err);
      return;
    }
    res.status(201).end();
  });
});

// ========== UNSPLASH ROUTES ================

app.get('/api/background', (req, res) => {
  axios.get('https://api.unsplash.com/photos/random?orientation=landscape', {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  }).then(({ data }) => res.send(data));
});

module.exports = app;
