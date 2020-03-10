import store from '../store';

export default function getURLfromID(id){
  const users = store.getState().user;
  for (var key in users) {
    if (users[key].id === id) {
      return users[key].avatarURL;
    }
  }
}