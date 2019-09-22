import React, { Component } from "react";
// import TicketHomePage from "./components/TicketHomePage";
import ToDoList from "./components/ToDoList";
import './components/page_layout/page.css';
import Header from './components/page_layout/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header text='JTK-SYE Tickets'/>
        <ToDoList/>
      </>
    );
  }
}

export default App;