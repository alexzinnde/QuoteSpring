const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost/quote_spring'
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mognoose connected successfully');
});

module.exports = db;
