import React, { Component } from 'react';
import axios from 'axios';

import QuoteForm from './QuoteForm';
import QuoteDisplay from './QuoteDisplay';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bgImage: '',
      quotes: [],
      loading: true,
    };
  }

  componentDidMount() {
    // axios.get('/api/background')
    //   .then(({ data }) => this.setState({
    //     bgImage: data.urls.full,
    //   }));

    axios.get('/api/quotes')
      .then(({ data }) => this.setState({
        loading: false,
        quotes: data,
      }));
  }

  render() {
    const { bgImage, quotes, loading } = this.state;

    const containerStyle = {
      width: '25%',
      height: '25%',
      margin: 'auto',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    };

    const bodyDivStyle = {
      width: '100vw',
      height: '100vh',
      backgroundImage: `url('${bgImage}')`,
      backgroundRepeat: 'none',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    };

    return (
      <div style={bodyDivStyle}>
        <div style={containerStyle}>

          {!loading
            && (
              <QuoteDisplay
                quote={quotes[0]}

              />
            )}

          <QuoteForm />
        </div>
      </div>
    );
  }
}

export default App;
