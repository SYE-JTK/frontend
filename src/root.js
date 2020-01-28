
import React, { Component } from "react";
import App from "./App";
import { bindActionCreators } from 'redux'

import Users from './users'

import TicketPage from "./components/ticket/TicketPage";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './components/page_layout/page.css';

import Header from './components/page_layout/Header';

import NoteTaking from "./components/note/NoteTaking";

import { connect } from 'react-redux';

import { fetchNotes } from './actions/notesActions';
import { fetchUsers } from './actions/userActions';

const admins = {
  "jonaspeek@gmail.com": 'jonas',
  "timwjones98@gmail.com": 'tim',
  "kmurphh27@gmail.com": 'kira',
}

function addToHomeScreen() {
  console.log("clicked");
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

  console.log("Button info: " + a2hsBtn);

  a2hsBtn.addEventListener("click", addToHomeScreen);
}

var deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("about to show add to homescreen");
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
    this.props.fetchUsers();
    this.props.fetchNotes();
  }

  render() {
    const { user } = this.props;
    console.log(this.state.students);
    return(
      <Router>
        <Header text='jtk-sye'>
          { user ? 
            <div className='routes'>
              <li>
                <Link className='header-text' to="/">Home</Link>
              </li>
              <li>
              <Link className='header-text' to="/NoteTaking">Messages</Link>
              </li>
              <li>
                <Link className='header-text' to="/users">People</Link>
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
        <Route path="/NoteTaking" component={NoteTaking} />

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