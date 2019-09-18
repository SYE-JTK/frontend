import * as React from 'react';

import TicketColumn from './TicketColumn';
import './ticketHomePage.css';

import { TICKET_STATUS_TYPES } from './constants/ticketStatus';


const TicketHomePage = () => {

  return (
    <div className='ticket-container'>
      <TicketColumn
        title={TICKET_STATUS_TYPES.PENDING}
        color='grey'
      />
      <TicketColumn
        title={TICKET_STATUS_TYPES.STARTED}
        color='grey'
      />
      <TicketColumn
        title={TICKET_STATUS_TYPES.IN_REVIEW}
        color='grey'
      />
      <TicketColumn
        title={TICKET_STATUS_TYPES.DONE}
        color='grey'
      />
    </div>
  );
}

export default TicketHomePage;
