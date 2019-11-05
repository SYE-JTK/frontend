
import React from "react";
import App from "./App";

import Users from './users'
import ToDoList from "./components/ToDoList";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './components/page_layout/page.css';

import Header from './components/page_layout/Header';

import NoteTaking from "./components/note/NoteTaking";

const Root = () => (
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

export default Root