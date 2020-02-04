import { userRef } from "../config/firebase";
import * as firebase from 'firebase/app';

export const addUser = newUser => async dispatch => {
  var newUserRef = userRef.push();
  newUserRef.child(firebase.auth().currentUser.uid).set({
    id: firebase.auth().currentUser.uid,
    ...newUser
  });
}

export const fetchUsers = () => async dispatch => {
  new Promise (() => {
    userRef.on("value", snapshot => {
      dispatch({
        type: 'FETCH_USERS',
        payload: snapshot.val()
      });
    })
  });
};
