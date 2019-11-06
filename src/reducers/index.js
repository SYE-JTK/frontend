import { combineReducers } from "redux";

import data from "./dataReducer";
import session from './sessionReducer'

const rootReducer = combineReducers({ 
  data,
  session
 });
export default rootReducer;
