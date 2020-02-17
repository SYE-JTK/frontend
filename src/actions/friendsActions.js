
import { userRef } from "../config/firebase";
import * as firebase from "firebase/app";
import { getNameFromId } from '../utils/getNameFromId';


export const addFriends = newFriend => async dispatch => {
    userRef.child(firebase.auth().currentUser.uid).child("friends").child(newFriend.id).set(newFriend);
    userRef.child(newFriend.id).child("friends").child(firebase.auth().currentUser.uid).set({
      name: getNameFromId(firebase.auth().currentUser.uid),
      id: firebase.auth().currentUser.uid
      });
};


export const fetchFriends = () => async dispatch => {
  userRef.child(firebase.auth().currentUser.uid).child("friends").on("value", snapshot => {
    dispatch({
      type: 'FETCH_FRIENDS',
      payload: snapshot.val()
      
    });
  }) 
};

export const friendRequest = (id, myid, myname) => async dispatch => {
  userRef.child(id).child("requests").child(firebase.auth().currentUser.uid).set({ id: myid, name: myname});
};



export const deleteRequest = (id )=> async dispatch => {
  userRef.child(firebase.auth().currentUser.uid).child("requests").child(id).remove();
  
};

export const fetchRequests = () => async dispatch => {
  userRef.child(firebase.auth().currentUser.uid).child("requests").on("value", snapshot => {
    dispatch({
      type: 'FETCH_REQUESTS',
      payload: snapshot.val()   
    });
  }); 
};





