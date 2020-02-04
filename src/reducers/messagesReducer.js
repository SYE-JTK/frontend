
const conversations = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CONVERSATIONS_ONE':
      return Object.assign(state, action.payload);
    case 'FETCH_CONVERSATIONS_TWO':
      return Object.assign(state, action.payload);
    default:
        return state;
  }
};

export default conversations;

