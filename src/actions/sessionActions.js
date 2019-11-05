
export const setUserId = (userId) => async dispatch => {
  dispatch({
    type: 'SET_USERID',
    currentUser: userId,
  });
};
