import * as React from 'react';
import './ticketHomePage.css';

import {TICKET_STATUS_TYPES} from './constants/ticketStatus';

interface IOwnProps {
  title: string;
  description: string;
  status: TICKET_STATUS_TYPES;
  owner?: string;
}

const Ticket: React.FunctionComponent<IOwnProps> = (props) => {

  const { title, description, owner, status } = props;

  const classes = status === TICKET_STATUS_TYPES.PENDING ? 'red' : 'green';

  return (
    <div className={`single-ticket-container ticket-row-${classes}`}>
      <div className='ticket-text-container'>
      
        <div className='ticket-text-spacer'>{ title }</div>
        <div className='ticket-text-spacer'>{ description }</div>
        <div className='ticket-text-spacer'>{ owner }</div>
        <div className='ticket-text-spacer'>Status: { status }</div>

      </div>
    </div>
  );
}

export default Ticket;
