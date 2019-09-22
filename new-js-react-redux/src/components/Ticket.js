import React, { Component } from 'react';
import './ticketHomePage.css';
import './page_layout/page.css';

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
    return status === 'Done' ? 'color-bg-success' : 
    status === 'Pending' ? 'color-bg-pending' : 'color-bg-main';
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
      <div className={`single-ticket-container ${this.classes(status)}`}>
        <div className='ticket-text-container'>
          
          <div className='ticket-text-spacer ticket-text-header'>Title</div>
          <div className='ticket-text-spacer'>{ title }</div>
          <div className='ticket-text-spacer ticket-text-header'>Description</div>
          {description ? <div className='ticket-text-spacer'>{ description }</div> : null}
          {owner? <div className='ticket-text-spacer ticket-text-header'>Owner</div> : null}
          <div className='ticket-text-spacer'>{ owner }</div>

          <div className='button-container'>
            <button
              className='button-main'
              onClick={() => this.handleCompleteClick(ticketId, status)}
            >
              { this.button(status) }
            </button>
          </div>
          

        </div>
      </div>
    );
  }
}

export default connect(null, { completeToDo, updateTicket })(Ticket);
