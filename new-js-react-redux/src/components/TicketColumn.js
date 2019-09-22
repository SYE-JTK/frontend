import React, { Component } from 'react';

// import { TICKET_STATUS_TYPES } from './ticketStatus';
import Ticket from './Ticket';
import './ticketHomePage.css';

import _ from "lodash";

class TicketColumn extends Component {
  
  render() {
    const { title, color, tickets } = this.props; 

    const tickets_list = _.map(tickets, (value, key) => {
      return (
        <Ticket
          key={key}
          ticketId={value.ticketKey}
          title={value.ticketValue.title}
          description={value.ticketValue.description}
          status={value.ticketValue.status}
        />
      );
    });

    return (
      <div className={`ticket-row-container ticket-row-${color}`}>
        
        <div className='ticket-header'>{ title }</div>

        { tickets_list }
      </div>
    );
  }
}

export default TicketColumn;
