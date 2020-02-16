import { FETCH_CONVERSATIONS_SINGLE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONVERSATIONS_SINGLE:
      return action.payload;
    default:
      return state;
  }
};
