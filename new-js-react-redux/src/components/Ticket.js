import React, { Component } from 'react';
import './ticketHomePage.css';

import { connect } from "react-redux";
import { completeToDo, updateTicket } from "../actions";


class Ticket extends Component {

  handleCompleteClick = (ticketId, currentStatus) => {
    const { completeToDo, updateTicket } = this.props;
    switch(currentStatus) {
      case 'Pending':
        updateTicket(ticketId, 'Started');
        break;
      case 'Started':
        updateTicket(ticketId, 'In Review');
        break;
      case 'In Review':
        updateTicket(ticketId, 'Done');
        break;
      case 'Done':
        completeToDo(ticketId);
        break;
      default:
        completeToDo(ticketId);
        break;
    }
  };

  classes = (status) => {
    switch(status){
      case 'Pending':
        return 'red';
      case 'Started':
        return 'yellow';
      case 'In Review':
        return 'yellow';
      case 'Done':
        return 'green';
      default:
        return 'red';
    }
  };

  button = (status) => {
    switch(status){
      case 'Pending':
        return 'Start';
      case 'Started':
        return 'Review Submitted';
      case 'In Review':
        return 'Done';
      case 'Done':
        return 'Delete';
      default:
        return 'Delete';
    }
  };

  render() {
    const { ticketId, title, description, owner, status } = this.props;
    return (
      <div className={`single-ticket-container ticket-row-${this.classes(status)}`}>
        <div className='ticket-text-container'>
          
          <div className='ticket-text-spacer'>{ title }</div>
          <div className='ticket-text-spacer'>Ticket Description</div>
          <div className='ticket-text-spacer'>{ description }</div>
          <div className='ticket-text-spacer'>{ owner }</div>
          <div className='ticket-text-spacer'>Status: { status }</div>

          <button onClick={() => this.handleCompleteClick(ticketId, status)}>
            { this.button(status) }
          </button>

        </div>
      </div>
    );
  }
}

export default connect(null, { completeToDo, updateTicket })(Ticket);
