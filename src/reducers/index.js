import { combineReducers } from "redux";

import data from "./dataReducer";
import session from './sessionReducer';
import notes from './noteReducer';
import user from './userReducer';

const rootReducer = combineReducers({ 
  data,
  session,
  notes,
  user
});

export default rootReducer;
