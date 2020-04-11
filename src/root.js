
import React, { Component } from "react";
import App from "./App";
import { bindActionCreators } from 'redux'

import Users from './users'
import Friends from './friends'

import TicketPage from "./components/ticket/TicketPage";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './components/page_layout/page.css';

import Header from './components/page_layout/Header';

import ProfileForm from "./components/Profile/ProfileForm";
import ProfilePage from "./components/Profile/ProfilePage";

import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import * as firebase from "firebase/app";

import { fetchNotes, fetchUsers } from './actions';
import Messages from "./components/messaging/messages";
import { userRef } from "./config/firebase";
import HomePage from "./components/home/HomePage";

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

  state = { students: null, url:"" }

  async componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchNotes();
    const currUser = firebase.auth().currentUser;
  
    if (currUser !== null){
      var user = userRef.child(currUser.uid);
      user.on('value', snapshot => {
        this.setState({ url: snapshot.child("avatarURL").val()})
      });
    }
    
  }

  render() {
    const { user } = this.props;
    
    return(
      <Router>
        <Header text='jtk-sye'>
          { user ? 
            <div className='routes'>
              <li>
                <Link className='header-text' to="/home">Home</Link>
              </li>
              <li>
                <Link className='header-text' to="/Friends"> Friends </Link>
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
            :
            <></>
          }
          { user ?
            <> 
              <span>
                <Link to="/my-profile">
                  <Avatar src={this.state.url} className='avatar'></Avatar>
                </Link>
              </span>
              <span>
                <Link className='log-in-out' to="/">Log Out</Link>
              </span>
            </>
            :
            <span>
              <Link className='log-in-out' to="/">Log In</Link>
            </span>
          }
          <button id="ad2hs-prompt" className="button-main download-app-button">
            Download Web App
          </button>
        </Header>
        
        <Route exact path="/" component={App} />
        <Route path="/home" component={HomePage} />
        <Route path="/users" component={Users} />
        <Route path="/ticket-tracker" component={TicketPage} />
        <Route path="/friends" component={Friends}/>
        <Route path="/messages" component={Messages} />
        <Route path="/edit-profile" component={ProfileForm}/>
        <Route path="/my-profile" component={ProfilePage}/>
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
