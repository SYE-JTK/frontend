import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

import { getNameFromId } from './getNameFromId';
import * as actions from '../actions';

class StartConversation extends Component {
  state = {
    currUser: firebase.auth().currentUser.uid,
    currUserName: "",
    userTwo: this.props.id,
    currentMessageId: "",
  };

  handlePickExistingUser = () => {
    let newMessage = {user1: this.state.currUser, user2: this.state.userTwo}
    let less = (newMessage.user1 < newMessage.user2) ? newMessage.user1 : newMessage.user2;
    let more = (newMessage.user1 > newMessage.user2) ? newMessage.user1 : newMessage.user2;
    this.props.setCurrentConvo(this.state.userTwo);
    
    this.setState({currentMessageId: `${less}@${more}`}, this.fetchAConversation);
  };

  fetchAConversation = () => {
    this.props.fetchSingleConversation(this.state.currentMessageId);
  }

  render() {
    return (
      <div>
        <ul>
          { 
            this.state.userTwo ?
            <li className='button-main'>
              <Link onClick={this.handlePickExistingUser} to="/messages">
                Message {getNameFromId(this.state.currentMessageId)}
              </Link>
            </li>
            :
            <div>There is no id associated with this user</div>
          }
        </ul>
      </div>
    );
  }
}

export default connect(null, actions)(StartConversation);
