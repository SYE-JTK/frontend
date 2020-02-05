
import store from '../store';

export const getNameFromId = (id) => {
  const users = store.getState().user;
  for (var key in users) {
    if (users[key].id === id) {
      return users[key].name;
    }
  }
}

