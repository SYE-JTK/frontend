
import React, { Component } from "react";
import App from "./App";

import Users from './users'
import ToDoList from "./components/ToDoList";
import Posts from "./components/posts/Posts";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './components/page_layout/page.css';

import Header from './components/page_layout/Header';

import NoteTaking from "./components/note/NoteTaking";

import { connect } from 'react-redux';

import { fetchNotes } from './actions/notesActions'
import { fetchUsers } from './actions/userActions'

class Root extends Component {

  async componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchNotes();
  }

  render() {
    return(
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
            <li>
              <Link className='header-text' to="/PostFeed">Posts</Link>
            </li>
          </div>
        </Header>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="/ToDoList" component={ToDoList} />
        <Route path="/NoteTaking" component={NoteTaking} />
        <Route path ="/PostFeed" component={Posts}/>
      </Router>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = {
  fetchUsers,
  fetchNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root)