
import { userRef } from "../config/firebase";
import * as firebase from "firebase/app";




export const friendRequest = (id, name) => async dispatch => {
  userRef.child(firebase.auth().currentUser.uid).child("requests").push({ id: id, name: name});
// id
//firebase.auth().currentUser.uid
};

// export const completeToDo = id => async dispatch => {
//   userRef.child(firebase.auth().currentUser.uid).child("request").remove();
// };

export const fetchRequests = () => async dispatch => {
  userRef.child(firebase.auth().currentUser.uid).child("requests").on("value", snapshot => {
    console.log(snapshot.val() );
    dispatch({
      type: 'FETCH_REQUESTS',
      payload: snapshot.val()   
    });
  }); 
};

