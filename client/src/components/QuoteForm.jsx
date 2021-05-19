import React, { useState } from 'react';
import axios from 'axios';

const saveQuote = (author, quote) => axios({
  method: 'post',
  url: '/api/quotes',
  data: {
    author,
    quote,
  },
});

const QuoteForm = () => {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      saveQuote(author, quote)
        .then(() => {
          setAuthor('');
          setQuote('');
          console.log('save complete');
        });
    }}
    >
      <input
        type="text"
        name="author"
        placeholder="Author.."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        name="quote"
        placeholder="Quote..."
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default QuoteForm;
