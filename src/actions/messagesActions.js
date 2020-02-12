import { messagesRef } from "../config/firebase";
import { FETCH_CONVERSATIONS_ONE, FETCH_CONVERSATIONS_TWO, FETCH_CONVERSATIONS_SINGLE } from "./types";


export const startNewConversation = users => async dispatch => {
  let lowUID = (users.user1 < users.user2) ? users.user1 : users.user2;
  let highUID = (users.user1 > users.user2) ? users.user1 : users.user2;
  let newConversationRef = messagesRef.child(`${lowUID}@${highUID}`);
  newConversationRef.set({
    user1: lowUID,
    user2: highUID
  });
};

export const sendMessage = newMessage => async dispatch => {
  let less = (newMessage.user1 < newMessage.user2) ? newMessage.user1 : newMessage.user2;
  let more = (newMessage.user1 > newMessage.user2) ? newMessage.user1 : newMessage.user2;
  
  let conversationRef = messagesRef.child(`${less}@${more}`).child("conversation");
  let key = conversationRef.push().key;
  conversationRef.child(key).set({
    id: key,
    content: newMessage.content,
    sender: newMessage.user1
  });
};


export const fetchSingleConversation = (fromUserId, toUserId) => async dispatch => {
  let less = (fromUserId < toUserId) ? fromUserId : toUserId;
  let more = (fromUserId > toUserId) ? fromUserId : toUserId;
  messagesRef.child(`${less}@${more}`).child("conversation").on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_SINGLE,
      payload: snapshot.val()
    });
  });
};

export const fetchConversations = (userId) => async dispatch => {
  messagesRef.orderByChild('user1').equalTo(userId).on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_ONE,
      payload: snapshot.val()
    });
  });
  messagesRef.orderByChild('user2').equalTo(userId).on('value', snapshot => {
    dispatch({
      type: FETCH_CONVERSATIONS_TWO,
      payload: snapshot.val()
    });
  });
};
