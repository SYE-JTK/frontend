import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

import { getNameFromId } from './getNameFromId';
import * as actions from '../actions';

class StartConversation extends Component {
  state = {
    currUser: firebase.auth().currentUser.uid,
    currUserName: "",
    userTwo: this.props.id,
    currentMessageId: "",
    redirect: false,
  };

  handlePickExistingUser = () => {
    const {currUser, userTwo} = this.state;
    const less = (currUser < userTwo) ? currUser : userTwo;
    const more = (currUser > userTwo) ? currUser : userTwo;
    const messageId = `${less}@${more}`
    this.setState({currentMessageId: messageId}, this.fetchAConversation);
  };

  fetchAConversation = () => {
    const {currUser, userTwo, currentMessageId} = this.state;
    const users = {'user1': currUser, 'user2': userTwo};
    this.props.startNewConversation(users);
    this.props.setCurrentConvo(userTwo);
    this.props.fetchSingleConversation(currentMessageId);
    this.setState({redirect: true});
  }

  render() {
    return (
      <div>
        <ul>
          { 
            this.state.userTwo &&
            <li onClick={this.handlePickExistingUser} className='button-main'>
              Message {getNameFromId(this.state.currentMessageId)}
            </li>
          }
          { this.state.redirect &&
            <Redirect to='/messages'/>
          }
        </ul>
      </div>
    );
  }
}

export default connect(null, actions)(StartConversation);
