import { userRef } from "../config/firebase";

export const addUser = newUser => async dispatch => {
  userRef.push().set(newUser);
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
