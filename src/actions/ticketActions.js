import { ticketsRef } from "../config/firebase";
import { FETCH_TODOS } from "./types";

export const addTicket = newTicket => async dispatch => {
  ticketsRef.push().set(newTicket);
};

export const completeToDo = completeTicketId => async dispatch => {
  ticketsRef.child(completeTicketId).remove();
};

export const updateTicket = (ticketId, newStatus) => async dispatch => {
  ticketsRef.child(ticketId).update({status: newStatus});
};

export const fetchToDos = () => async dispatch => {
  ticketsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};