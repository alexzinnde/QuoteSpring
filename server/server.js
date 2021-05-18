require('dotenv').config();

const path = require('path');
const express = require('express');
const db = require('./database');
const quotes = require('./database/controllers/quotes');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/api/quotes', (req, res) => {
  quotes.getQuotes()
    .then((quotes) => res.send(quotes));
});

app.post('/api/quotes', (req, res) => {
  quotes.saveQuote(req.body).save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving to the DB');
      return;
    }
    res.status(201).end();
  });
});

module.exports = app;
