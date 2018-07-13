import React, { Component } from 'react';
import Header from './Header';
import Search from './Search';
import '../src/styles/styles.css'

class App extends Component {
    
  render() {
    const title="Movies App"
    return (
      <div className="App">
        <Header title={title} />
        <div>
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
