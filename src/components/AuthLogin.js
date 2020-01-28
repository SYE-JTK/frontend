import React, { Component } from 'react';

import * as firebase from 'firebase/app';

import 'firebase/auth';

import { FirebaseConfig } from "../config/keys";

import GoogleButton from 'react-google-button';

import withFirebaseAuth from 'react-with-firebase-auth';

import { setUserId } from '../actions/sessionActions'
import { addUser } from '../actions/userActions'

import store from '../store';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const firebaseAppAuth = firebase.auth();

const providers ={
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class AuthLogin extends Component {

  async componentDidUpdate() {
    const usersState = store.getState().user;
    const currUser = firebase.auth().currentUser;
    if (currUser && usersState) {
      let newUser = true;
      for (var key in usersState) {
        if (usersState[key].email === currUser.email) {
          newUser = false;
          break;
        }
      }
      if (newUser) {
        store.dispatch(addUser({name: currUser.displayName, email: currUser.email}));
      }
    }
  }

  render() {
    const{
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
        <div
          style={{
            display: "flex",
            justifyContent: "center"
           
        }}>

        
        <div className="App margin-l-2">
          <div className="App-header"/>
          {
            user
            ? <p className='note-title'>
                Hello, {user.displayName}!
              </p>
            : <h1 className='note-title'>Sign in to view content</h1>
          }
          {
            user
            ? <button className='button-close margin-t-1' onClick={signOut}>Sign out</button>
            : <GoogleButton className='button-main margin-t-1' onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
          }
        </div>
        </div>
    );
  };
}

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