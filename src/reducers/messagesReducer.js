import { FETCH_CONVERSATIONS_ONE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONVERSATIONS_ONE:
      return action.payload;
    default:
        return state;
  }
};
