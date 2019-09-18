import * as React from 'react';

import { TICKET_STATUS_TYPES } from './constants/ticketStatus';
import Ticket from './Ticket';
import './ticketHomePage.css';

interface IOwnProps {
  title: TICKET_STATUS_TYPES;
  color: string;
  tickets?: object[];
}

const TicketColumn: React.FunctionComponent<IOwnProps> = (props) => {

  return (
    <div className={`ticket-row-container ticket-row-${props.color}`}>
      
      <div className='ticket-header'>{ props.title }</div>

      <Ticket
        title='First Ticket'
        description='This is the first ticket'
        status={props.title}
      />

      <Ticket
        title='First Ticket'
        description='This is the first ticket'
        status={props.title}
      />

      <Ticket
        title='First Ticket'
        description='This is the first ticket'
        status={props.title}
      />
      
    </div>
  );
}

export default TicketColumn;
