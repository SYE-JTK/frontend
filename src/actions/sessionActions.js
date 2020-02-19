
export const setUserId = (userId) => async dispatch => {
  dispatch({
    type: 'SET_USERID',
    payload: userId,
  });
};

export const setCurrentConvo = (userId) => async dispatch => {
  dispatch({
    type: 'SET_CURRENT_CONVO',
    payload: userId,
  });
};
