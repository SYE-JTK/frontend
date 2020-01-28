import { combineReducers } from "redux";

import data from "./dataReducer";
import session from './sessionReducer';
import notes from './noteReducer';
import user from './userReducer';
import conversation from './messagesReducer';

const rootReducer = combineReducers({ 
  data,
  session,
  notes,
  user,
  conversation
});

export default rootReducer;
