
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";

import Users from './users'
import ToDoList from "./components/ToDoList";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './components/page_layout/page.css';

import Header from './components/page_layout/Header';

import * as firebase from 'firebase/app';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const Root = ({store}) =>(
  <Provider store={store}>
    <Router>
      <Header text='jtk-sye'>
        <div>
          <ul className='routes header'>
            <li>
              <Link className='header-text' to="/">Home</Link>
            </li>
            <li>
              <Link className='header-text' to="/users">Users</Link>
            </li>
            <li>
              <Link className='header-text' to="/ToDoList">ToDoList</Link>
            </li>
          </ul>
        </div>
      </Header>
      <Route exact path="/" component={App} />
      <Route path="/users" component={Users} />
      <Route path="/ToDoList" component={ToDoList} />
   </Router>
  </Provider>
)



ReactDOM.render(
  <Provider store={store}>
    <Root store={store} />
    {/* <App /> */}
  </Provider>,
   document.getElementById("root")
);
//ReactDOM.render(routing, document.getElementById('root'))
  } else {
    // No user is signed in.
  }
});


