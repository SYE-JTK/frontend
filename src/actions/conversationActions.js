import { userRef, messagesRef } from "../config/firebase";
import { FETCH_CONVERSATIONS_ONE } from "./types";
import * as firebase from 'firebase/app';

export const startNewConversation = users => async dispatch => {
  const lowUID = (users.user1 < users.user2) ? users.user1 : users.user2;
  const highUID = (users.user1 > users.user2) ? users.user1 : users.user2;
  const messageId = `${lowUID}@${highUID}`;
  const user1ConversationsRef = userRef.child(lowUID).child('conversations');
  const user2ConversationsRef = userRef.child(highUID).child('conversations');

  user1ConversationsRef.once('value', function(snapshot) {
    if (snapshot.hasChild(messageId)) {
      console.log('message exists in user1');
    } else {
      console.log('adding to user 1');
      user1ConversationsRef.child(messageId).set({
        id: messageId,
        user1: lowUID,
        user2: highUID,
        lastSentTime: Date.now(),
        lastSentText: ""
      });
    }
  });

  user2ConversationsRef.once('value', function(snapshot) {
    if (snapshot.hasChild(messageId)) {
      console.log('message exists in user2');
    } else {
      user2ConversationsRef.child(messageId).set({
        id: messageId,
        user1: lowUID,
        user2: highUID,
        lastSentTime: Date.now(),
        lastSentText: ""
      });
    }
  });

  messagesRef.once('value', function(snapshot) {
    if (snapshot.hasChild(messageId)) {
      console.log('conversation exists in messages');
    } else {
      messagesRef.child(messageId).set({
        user1: lowUID,
        user2: highUID
      });
    }
  });
};

export const fetchConversations = () => async dispatch => {
  const userId = firebase.auth().currentUser.uid;
  const conversationsRef = userRef.child(userId).child('conversations');
  conversationsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_ONE,
      payload: snapshot.val()
    });
  });
};
