import { messagesRef, userRef } from "../config/firebase";
import { FETCH_CONVERSATIONS_SINGLE } from "./types";
import * as firebase from 'firebase/app';

export const sendMessage = newMessage => async dispatch => {
  const conversationsRef = userRef.child(firebase.auth().currentUser.uid).child('conversations');
  let less = (newMessage.user1 < newMessage.user2) ? newMessage.user1 : newMessage.user2;
  let more = (newMessage.user1 > newMessage.user2) ? newMessage.user1 : newMessage.user2;
  
  let sendConversationRef = messagesRef.child(`${less}@${more}`).child("conversation");
  let key = sendConversationRef.push().key;
  sendConversationRef.child(key).set({
    id: key,
    content: newMessage.content,
    sender: newMessage.user1
  });

  conversationsRef.child(`${less}@${more}`).update({
    lastSentTime: Date.now(),
    lastSentText: newMessage.content
  })

  userRef.child(newMessage.user2).child('conversations').child(`${less}@${more}`).update({
    lastSentTime: Date.now(),
    lastSentText: newMessage.content
  })
};


export const fetchSingleConversation = (id) => async dispatch => {
  messagesRef.child(id).child("conversation").on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_SINGLE,
      payload: snapshot.val()
    });
  });
};
