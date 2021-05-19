import React from 'react';

const QuoteDisplay = ({ quotes, quote }) => (
  <div>
    <h4>{quote.quote}</h4>
    <p>{quote.author}</p>
  </div>
);

export default QuoteDisplay;
