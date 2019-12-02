import * as React from 'react';

import TicketColumn from './TicketColumn';
import './ticketHomePage.css';

import { TICKET_STATUS_TYPES } from './ticketStatus';

import store from '../../store';

const TicketHomePage = () => {
  const session = store.getState().session;
  console.log(session.currentUser);
  return (
    <>
    { session.currentUser ?
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
      :
      <h1>
        Login to see tickets
      </h1>
    }
    </>
  );
}

export default TicketHomePage;
