import * as React from 'react';

import { TICKET_STATUS_TYPES } from './constants/ticketStatus';
import Ticket from './Ticket';
import './ticketHomePage.css';

interface IOwnProps {
  title: string;
  color: string;
}

const TicketColumn: React.FunctionComponent<IOwnProps> = (props) => {

  return (
    <div className={`ticket-row-container ticket-row-${props.color}`}>
      
      <div className='ticket-header'>{ props.title }</div>

      <Ticket
        title='First Ticket'
        description='This is the first ticket'
        status={TICKET_STATUS_TYPES.PENDING}
      />

      <Ticket
        title='First Ticket'
        description='This is the first ticket'
        status={TICKET_STATUS_TYPES.DONE}
      />

      <Ticket
        title='First Ticket'
        description='This is the first ticket'
        status={TICKET_STATUS_TYPES.IN_REVIEW}
      />
      
    </div>
  );
}

export default TicketColumn;
