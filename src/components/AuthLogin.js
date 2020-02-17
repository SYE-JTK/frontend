import React, { Component } from 'react';

import * as firebase from 'firebase/app';

import 'firebase/auth';

import { FirebaseConfig } from "../config/keys";

import { GoogleLoginButton }from 'react-social-login-buttons';
import { FacebookLoginButton } from "react-social-login-buttons";

import logo from '../images/logo512.png';

import Button from 'react-bootstrap/Button'

import withFirebaseAuth from 'react-with-firebase-auth';

import { setUserId } from '../actions'
import { addUser } from '../actions'

import store from '../store';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const firebaseAppAuth = firebase.auth();

const providers ={
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};



class AuthLogin extends Component {

  signInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

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
      signInWithFacebook
    } = this.props;

    return (
      <>
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=1020686348315232&autoLogAppEvents=1"></script>
        
        <div className="text-center mt-10">
          <div className="form-signin">
            <img className="mb-4" src={logo} alt="" width="100" height="100"/>
            <div className="App-header"/>
            {
              user
              ? <p className='h3 mb-3 font-weight-normal'>
                  Hello, {user.displayName}!
                </p>
              : <h1 className='h3 mb-3 font-weight-normal'>Sign in to view content</h1>
            }
            {
              user
              ? <Button className="btn btn-lg btn-primary btn-block" onClick={signOut}>Sign out</Button>
              : <div>
                  <GoogleLoginButton className='button-main margin-t-1 form-label-group' onClick={signInWithGoogle}>Sign in with Google</GoogleLoginButton>
                  <FacebookLoginButton className='form-label-group' onClick={signInWithFacebook}>Sign in with Facebook</FacebookLoginButton>
                </div>
            }
          </div>
        </div>
      </>
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