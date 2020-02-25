
import store from "../store";
import {fetchUsers} from "../actions"

export function getNameFromId(id) {
  if (!store.getState().user) store.dispatch(fetchUsers())
  
  const users = store.getState().user;
  for (var key in users) {
    if (users[key].id === id) {
      return users[key].name;
    }
  }
}
