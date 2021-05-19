require('dotenv').config();
require('./database');

const path = require('path');
const axios = require('axios');
const express = require('express');

const quotes = require('./database/controllers/quotes');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client', 'dist')));
app.use(express.json());

// ========== QUOTE ROUTES ================
app.get('/api/quote', (req, res) => {
  quotes.getQuotes()
    .then((allQuotes) => {
      const randomIndex = Math.floor(Math.random() * allQuotes.length);
      res.send(allQuotes[randomIndex]);
    });
});

const isAuthorEmpty = require('./middleware/isAuthorEmpty');

app.post('/api/quotes', isAuthorEmpty, (req, res) => {
  const { quote, author } = req.body;
  quotes.saveQuote({ quote, author }).save((err) => {
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

// ========== WEATHER ROUTES ================
app.get('/api/weather', (req, res) => {
  const { lat, lon } = req.query;
  // axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
  //   .then(({ data }) => res.send(data));

  res.send(require('../Sample_Data/sampleWeather'));
});

module.exports = app;
