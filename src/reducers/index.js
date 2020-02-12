import { combineReducers } from "redux";
import data from "./dataReducer";
import session from './sessionReducer';
import notes from './noteReducer';
import user from './userReducer';
import conversations from './messagesReducer';
import currentConversation from './conversationReducer';

const rootReducer = combineReducers({ 
  data,
  session,
  notes,
  user,
  conversations,
  currentConversation
});

export default rootReducer;
