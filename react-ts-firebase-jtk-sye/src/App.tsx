import * as React from 'react';
import './App.css';
import TicketHomePage from './ticket-homepage/TicketHomePage';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <TicketHomePage/>
      </div>
    );
  }
}

export default App;
