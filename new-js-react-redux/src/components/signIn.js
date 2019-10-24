import * as React from 'react';

import * as firebase from 'firebase/app';

import 'firebase/auth';

import { FirebaseConfig } from "../config/keys";

import withFirebaseAuth from 'react-with-firebase-auth';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const firebaseAppAuth = firebase.auth();

const providers ={
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


class AuthLogin extends React.Component {
    render() {
        const{
          user,
          signOut,
          signInWithGoogle,
        } = this.props;
        return (
            <div className="App">
              <div className="App-header"/>
              {
                user
                ? <p>Hello, {user.displayName}</p>
                : <p>Please sign in.</p>
              }
              {
                user
                ? <button onClick={signOut}>Sign out</button>
                : <button onClick={signInWithGoogle}>Sign in with Google</button>
              }
            </div>
        );
      }
};

export default withFirebaseAuth({
    firebaseAppAuth,
    providers,
  })(AuthLogin);