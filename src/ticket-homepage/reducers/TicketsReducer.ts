import { TICKET_ACTION_TYPES } from '../constants/ticketStatus';

/*
 src/reducers/simpleReducer.js
*/

export default (state = {}, action: { type: TICKET_ACTION_TYPES; payload: any; }) => {
  switch (action.type) {
   case TICKET_ACTION_TYPES.ADD_TICKET:
    return {
     result: action.payload
    }
   default:
    return state
  }
 }