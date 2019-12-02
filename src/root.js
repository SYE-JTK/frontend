
import React, { Component } from "react";
import App from "./App";
import { bindActionCreators } from 'redux'

import Users from './users'
import TicketPage from "./components/ticket/TicketPage";
import Posts from "./components/posts/Posts";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './components/page_layout/page.css';

import Header from './components/page_layout/Header';

import NoteTaking from "./components/note/NoteTaking";

import { connect } from 'react-redux';

import { fetchNotes } from './actions/notesActions'
import { fetchUsers } from './actions/userActions'

const admins = {
  "jonaspeek@gmail.com": 'jonas',
  "timwjones98@gmail.com": 'tim',
  "kmurphh27@gmail.com": 'kira',
}

class Root extends Component {

  async componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchNotes();
  }

  render() {
    const { user } = this.props;
    return(
      <Router>
        <Header text='jtk-sye'>
          { user ? 
            <div className='routes'>
              <li>
                <Link className='header-text' to="/">Home</Link>
              </li>
              <li>
                <Link className='header-text' to="/PostFeed">Posts</Link>
              </li>
              <li>
                <Link className='header-text' to="/users">Users</Link>
              </li>
              <li>
              <Link className='header-text' to="/NoteTaking">Notes</Link>
              </li>
              { admins[user] ?
                <li>
                  <Link className='header-text' to="/ticket-tracker">Ticket Tracker</Link>
                </li>
                :
                <></>
              }
            </div>
            : <></>
          }
        </Header>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="/ticket-tracker" component={TicketPage} />
        <Route path="/NoteTaking" component={NoteTaking} />
        <Route path ="/PostFeed" component={Posts}/>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers, fetchNotes }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Root)