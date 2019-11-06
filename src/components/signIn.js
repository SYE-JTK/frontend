import * as React from 'react';

import * as firebase from 'firebase/app';

import 'firebase/auth';

import { FirebaseConfig } from "../config/keys";

import withFirebaseAuth from 'react-with-firebase-auth';

import { setUserId } from '../actions/sessionActions'

import store from '../store';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const firebaseAppAuth = firebase.auth();

const providers ={
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AuthLogin = (props) => {
  const{
    user,
    signOut,
    signInWithGoogle,
  } = props;

  return (
      <div className="App">
        <div className="App-header"/>
        {
          user
          ? <p>
              Hello, {user.email}
            </p>
          : <h1>Please sign in.</h1>
        }
        {
          user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </div>
  );
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(setUserId(user.email));
  } else {
    store.dispatch(setUserId(null));
  }
})

const component = withFirebaseAuth({
  firebaseAppAuth,
  providers,
})(AuthLogin);

export default component;