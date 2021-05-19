import React, { Component } from 'react';
import axios from 'axios';

import QuoteForm from './QuoteForm';
import QuoteDisplay from './QuoteDisplay';
import Portal from './Portal';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bgImage: '',
      quote: '',
      loading: true,
      isQuotePortal: false,
    };
    this.openQuotePortal = this.openQuotePortal.bind(this);
    this.closeQuotePortal = this.closeQuotePortal.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  handleKeyPress(e) {
    if (e.key === 'q') {
      this.getNewQuote();
    }
  }

  getNewQuote() {
    this.setState(() => ({ loading: true }));
    axios.get('/api/quote')
      .then(({ data }) => this.setState({
        loading: false,
        quote: data,
      }));
  }

  openQuotePortal() {
    this.setState({ isQuotePortal: true });
  }

  closeQuotePortal() {
    this.setState({ isQuotePortal: false });
  }

  render() {
    const {
      bgImage,
      quote,
      loading,
      isQuotePortal,
    } = this.state;

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
          <Header
            openQuotePortal={this.openQuotePortal}
            handleKeyPress={this.handleKeyPress}
          />
          <div className="container">
            {!loading
              && !isQuotePortal
              && (
                <QuoteDisplay
                  quote={quote}
                  onClick={this.getNewQuote}
                  handleKeyPress={this.handleKeyPress}
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
