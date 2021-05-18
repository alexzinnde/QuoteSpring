const Quote = require('../models/quote');

const getQuotes = () => Quote.find({});

const saveQuote = (body) => new Quote(body);

module.exports.getQuotes = getQuotes;
module.exports.saveQuote = saveQuote;
