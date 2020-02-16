import { userRef, messagesRef } from "../config/firebase";
import { FETCH_CONVERSATIONS_ONE, FETCH_CONVERSATIONS_TWO } from "./types";
import {fetchSingleConversation} from './messagesActions';
import * as firebase from 'firebase/app';


export const startNewConversation = users => async dispatch => {
  let lowUID = (users.user1 < users.user2) ? users.user1 : users.user2;
  let highUID = (users.user1 > users.user2) ? users.user1 : users.user2;
  const conversationsRef = userRef.child(firebase.auth().currentUser.uid).child('conversations');

  let newConversationRef = conversationsRef.child(`${lowUID}@${highUID}`);
  newConversationRef.set({
    id: `${lowUID}@${highUID}`,
    user1: lowUID,
    user2: highUID,
    lastSentTime: Date.now()
  });

  if (messagesRef.child(`${lowUID}@${highUID}`)) {
    fetchSingleConversation(`${lowUID}@${highUID}`);
  } else {
    newConversationRef = messagesRef.child(`${lowUID}@${highUID}`);
    newConversationRef.set({
      user1: lowUID,
      user2: highUID
    });
  }
};

export const fetchConversations = () => async dispatch => {
  const userId = firebase.auth().currentUser.uid;
  const conversationsRef = userRef.child(userId).child('conversations');
  conversationsRef.orderByChild('user1').equalTo(userId).on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_ONE,
      payload: snapshot.val()
    });
  });
  conversationsRef.orderByChild('user2').equalTo(userId).on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_TWO,
      payload: snapshot.val()
    });
  });
};
