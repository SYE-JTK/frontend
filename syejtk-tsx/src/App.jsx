import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './home-page/inputField';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="App-header"/>
          <InputField/>
        </div>
    );
  }
}

export default App;
