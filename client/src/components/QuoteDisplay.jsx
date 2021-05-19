import React from 'react';

const QuoteDisplay = ({ quotes, quote }) => (
  <div className="card ">
    <h2 className="quote fade-in">{quote.quote}</h2>
    <p className="author fade-in delay">- {quote.author}</p>
  </div>
);

export default QuoteDisplay;
