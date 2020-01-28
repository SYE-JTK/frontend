import { messagesRef } from "../config/firebase";

import store from '../../store';

export const sendMessage = newMessage => async dispatch => {
  messagesRef.push().set(newMessage);
}

export const conversationsRef = messagesRef.child(store.getState().session.currentUser);

export const fetchConversations = () => async dispatch => {
  conversationsRef.on('value', snapshot => {
      dispatch({
          type: 'FETCH_CONVERSATIONS',
          payload: snapshot.val()
      });
  });
};
