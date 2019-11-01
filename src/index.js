
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
import NoteTaking from "./components/note/NoteTaking";

const Root = () =>(
  <Router>
    <Header text='jtk-sye'>
      <div className='routes'>
        <li>
          <Link className='header-text' to="/">Home</Link>
        </li>
        <li>
          <Link className='header-text' to="/users">Users</Link>
        </li>
        <li>
          <Link className='header-text' to="/ToDoList">ToDoList</Link>
        </li>
        <li>
        <Link className='header-text' to="/NoteTaking">Notes</Link>
        </li>
      </div>
    </Header>
    <Route exact path="/" component={App} />
    <Route path="/users" component={Users} />
    <Route path="/ToDoList" component={ToDoList} />
    <Route path="/NoteTaking" component={NoteTaking} />
  </Router>
)

firebase.auth().onAuthStateChanged(function(user) {
  const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
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


