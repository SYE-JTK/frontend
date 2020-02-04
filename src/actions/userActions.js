import { userRef } from "../config/firebase";

export const addUser = newUser => async dispatch => {
  var newUserRef = userRef.push();
  console.log("new: " + newUserRef);
  newUserRef.set({
    id: newUserRef.key,
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
