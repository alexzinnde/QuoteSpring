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

const QuoteForm = ({ close }) => {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');

  return (
    <div className="portal-box">
      <h2>Add A Quote</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveQuote(author, quote)
            .then(() => {
              setAuthor('');
              setQuote('');
              close();
            });
        }}
        autoComplete="new-password"
      >
        <input
          type="text"
          name="quote"
          placeholder="Quote..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <input
          type="text"
          name="author"
          placeholder="Author.."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">submit</button>
        <button
          type="button"
          onClick={() => close()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
