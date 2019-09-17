import * as React from 'react';

import TicketColumn from './TicketColumn';
import './ticketHomePage.css';

import { TICKET_STATUS_TYPES } from './constants/ticketStatus';


const TicketHomePage = () => {

  return (
    <div className='ticket-container'>
      <TicketColumn
        title={TICKET_STATUS_TYPES.PENDING}
        color='blue'
      />
      <TicketColumn
        title={TICKET_STATUS_TYPES.STARTED}
        color='blue'
      />
      <TicketColumn
        title={TICKET_STATUS_TYPES.IN_REVIEW}
        color='blue'
      />
      <TicketColumn
        title={TICKET_STATUS_TYPES.DONE}
        color='blue'
      />
    </div>
  );
}

export default TicketHomePage;
