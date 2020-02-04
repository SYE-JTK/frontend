
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

import { fetchConversations, sendMessage } from './actions/messagesActions';
import { fetchNotes } from './actions/notesActions';
import { fetchUsers } from './actions/userActions';
import messages from "./components/messaging/messages";
import store from "./store";

const admins = {
  "jonaspeek@gmail.com": 'jonas',
  "timwjones98@gmail.com": 'tim',
  "kmurphh27@gmail.com": 'kira',
}

function addToHomeScreen() {
  var a2hsBtn = document.getElementById('ad2hs-prompt');  // hide our user interface that shows our A2HS button
  a2hsBtn.style.display = 'none';  // Show the prompt
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function(choiceResult){

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }

  deferredPrompt = null;

});}

function showAddToHomeScreen() {
  var a2hsBtn = document.getElementById('ad2hs-prompt');
  a2hsBtn.style.display = 'inline-block';

  a2hsBtn.addEventListener("click", addToHomeScreen);
}

var deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  showAddToHomeScreen();
});

window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs installed');
  var a2hsBtn = document.getElementById('ad2hs-prompt');
  a2hsBtn.style.display = 'none';
});

class Root extends Component {

  state = { students: null }

  async componentDidMount() {
    this.props.sendMessage({
      user1: "68qhinwefoni",
      user2: "2345tghjgy",
      content: "Ohhh jeez"
    });
    this.props.fetchConversations(store.getState().session.currentUser);
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
                <Link className='header-text' to="/post-feed">Posts</Link>
              </li>
              <li>
                <Link className='header-text' to="/users">Users</Link>
              </li>
              <li>
                <Link className='header-text' to="/note-taking">Notes</Link>
              </li>
              <li>
                <Link className='header-text' to="/messages">Messages</Link>
              </li>
              { admins[user] ?
                <li>
                  <Link className='header-text' to="/ticket-tracker">Ticket Tracker</Link>
                </li>
                :
                <></>
              }
            </div>
            :<> </>
          }
          <button id="ad2hs-prompt" className="button-main download-app-button">
            Download Web App
          </button>
        </Header>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="/ticket-tracker" component={TicketPage} />
        <Route path="/note-taking" component={NoteTaking} />
        <Route path="/messages" component={messages} />
        <Route path ="/post-feed" component={Posts}/>
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
  return bindActionCreators({ fetchUsers, fetchNotes, fetchConversations, sendMessage }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Root)