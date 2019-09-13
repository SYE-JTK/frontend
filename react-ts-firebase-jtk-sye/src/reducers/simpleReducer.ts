/*
 src/reducers/simpleReducer.js
*/

export default (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
   case 'SIMPLE_ACTION':
    return {
     result: action.payload
    }
   default:
    return state
  }
 }