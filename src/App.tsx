import * as React from 'react';
import './App.css';
import AuthLogin from './firebase/signIn'


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        
        <AuthLogin/>
      </div>
    );
  }
}

export default App;
