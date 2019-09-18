/*
 src/actions/simpleAction.js
*/
export const simpleAction = () => (dispatch: (arg0: { payload: string; type: string; }) => void) => {
 dispatch({
  payload: 'result_of_simple_action',
  type: 'SIMPLE_ACTION'
 })
}