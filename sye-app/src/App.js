import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Kira, Tim, Jonas SYE</h2>
          <h1>Content</h1>
          <input
            type='text'
            placeholder='name'
          >
            Enter you name
          </input>
        </div>
        <p className="App-intro">
          Hello World!
        </p>
      </div>
    );
  }
}

export default App;
