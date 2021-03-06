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
    this.getBackgrounImage();
    this.getQuote();
  }

  handleKeyPress(e) {
    if (e.key === 'q') {
      this.getNewQuote();
    }
  }

  getBackgrounImage() {
    axios.get('/api/background')
      .then(({ data }) => this.setState({
        bgImage: data.urls.full,
      }));
  }

  getQuote() {
    axios.get('/api/quote')
      .then(({ data }) => this.setState({
        loading: false,
        quote: data,
      }));
  }

  getNewQuote() {
    this.setState(() => ({ loading: true }));
    this.getQuote();
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
      backgroundPosition: 'center',
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
