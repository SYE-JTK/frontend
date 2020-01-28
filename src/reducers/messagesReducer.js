
const conversations = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CONVERSATIONS':
        return action.payload;
    default:
        return state;
  }
};

export default conversations;

