import React, { Component } from 'react';
import axios from 'axios';

import QuoteForm from './QuoteForm';
import QuoteDisplay from './QuoteDisplay';
import Portal from './Portal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bgImage: '',
      quote: '',
      loading: true,
      isQuotePortal: false,
    };

    this.closeQuotePortal = this.closeQuotePortal.bind(this);
  }

  componentDidMount() {
    // axios.get('/api/background')
    //   .then(({ data }) => this.setState({
    //     bgImage: data.urls.full,
    //   }));

    setTimeout(() => this.setState({ bgImage: 'https://images.unsplash.com/photo-1619139529130-f168eccd80d0?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMzIwMTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjE0MzQwOTM&ixlib=rb-1.2.1&q=85' }), 200);

    axios.get('/api/quote')
      .then(({ data }) => this.setState({
        loading: false,
        quote: data,
      }));
  }

  closeQuotePortal() {
    this.setState({ isQuotePortal: false })
  }

  render() {
    const { bgImage, quote, loading, isQuotePortal } = this.state;

    const bodyDivStyle = {
      width: '100vw',
      height: '100vh',
      backgroundImage: `url('${bgImage}')`,
      backgroundRepeat: 'none',
      backgroundSize: 'cover',
    };

    return (
      <>
        <div
          className="fade-in-bg"
          style={bodyDivStyle}
        >
          <div className="header">
            <span
              id="addQuote"
              onClick={() => this.setState({ isQuotePortal: true })}
            >Add A Quote</span>
            <div>
              Current Temp
            </div>
          </div>
          <div className="container">
            {!loading
              && (
                <QuoteDisplay
                  quote={quote}
                />
              )}
            <Portal
              open={isQuotePortal}
            >
              <QuoteForm
                close={this.closeQuotePortal}
              />
            </Portal>
          </div>
        </div>
      </>
    );
  }
}

export default App;
