import React from 'react';

const QuoteDisplay = ({ onClick, quote, handleKeyPress }) => (
  <div
    className="card "
    onClick={() => onClick()}
    role="button"
    onKeyPress={(e) => handleKeyPress(e)}
    tabIndex="0"
  >
    <h2 className="quote fade-in">{quote.quote}</h2>
    <p className="author fade-in delay">
      -
      {quote.author}
    </p>
  </div>
);

export default QuoteDisplay;
