import { messagesRef } from "../config/firebase";

export const startNewConversation = users => async dispatch => {
  let less = (users.user1 < users.user2) ? users.user1 : users.user2;
  let more = (users.user1 > users.user2) ? users.user1 : users.user2;
  
  let newConversationRef = messagesRef.child(`${less}@${more}`);
  newConversationRef.set({
    user1: users.user1,
    user2: users.user2
  });
}

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
}

export const fetchConversations = userId => async dispatch => {
  messagesRef.orderByChild('user1').equalTo(userId).on('value', snapshot => {
    dispatch({
      type: 'FETCH_CONVERSATIONS_ONE',
      payload: snapshot.val()
    });
  });
  messagesRef.orderByChild('user2').equalTo(userId).on('value', snapshot => {
    dispatch({
      type: 'FETCH_CONVERSATIONS_TWO',
      payload: snapshot.val()
    });
  });
};
