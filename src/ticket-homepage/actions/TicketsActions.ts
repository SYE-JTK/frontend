import { TICKET_ACTION_TYPES } from '../constants/ticketStatus';

export const addTicket = () => (dispatch: (arg0: { payload: string; type: string; }) => void) => {
  dispatch({
   payload: 'result_of_simple_action',
   type: TICKET_ACTION_TYPES.ADD_TICKET
  })
 }