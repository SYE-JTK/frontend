import React, { Component } from "react";
// import TicketHomePage from "./components/TicketHomePage";
import ToDoList from "./components/ToDoList";

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <TicketHomePage /> */}
        <ToDoList />
      </div>
    );
  }
}

export default App;