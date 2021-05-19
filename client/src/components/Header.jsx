import React from 'react';
import WeatherWidget from './WeatherWidget';

const Header = ({ openQuotePortal, handleKeyPress }) => (
  <div className="header">
    <span
      id="addQuote"
      role="button"
      tabIndex="0"
      onClick={() => openQuotePortal()}
      onKeyPress={(e) => handleKeyPress(e)}
    >
      Add A Quote
    </span>
    <WeatherWidget />
  </div>
);

export default Header;
