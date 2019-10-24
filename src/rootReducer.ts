/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux';
import TicketsReducer from './ticket-homepage/reducers/TicketsReducer';

export default combineReducers({
 TicketsReducer,
});