import { combineReducers } from "redux";

import data from "./dataReducer";
import session from './sessionReducer';
import notes from './noteReducer';

const rootReducer = combineReducers({ 
  data,
  session,
  notes
});
export default rootReducer;
