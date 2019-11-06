
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import './components/page_layout/page.css';

import * as firebase from 'firebase/app';

import Root from './root'

import store from './store'

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ReactDOM.render(
      <Provider store={store}>
        <Root/>
      </Provider>,
      document.getElementById("root")
    );
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <Root/>
      </Provider>,
      document.getElementById("root")
    );
  }
});
