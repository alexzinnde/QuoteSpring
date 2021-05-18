const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quote_spring', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mognoose connected successfully');
});

module.exports = db;
