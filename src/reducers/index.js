import { combineReducers } from "redux";
import data from "./dataReducer";
import session from './sessionReducer';
import notes from './noteReducer';
import user from './userReducer';
import conversations from './messagesReducer';
import currentConversation from './singleConversationReducer';
import friends from './friendsReducer';
import requests from './requestReducer';


const rootReducer = combineReducers({ 
  data,
  session,
  notes,
  user,
  conversations,
  currentConversation,
  friends,
  requests
});

export default rootReducer;
