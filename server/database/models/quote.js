const { Schema, model } = require('mongoose');

const quoteSchema = new Schema({
  author: {
    type: String,
    default: 'Unknown',
  },
  quote: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
