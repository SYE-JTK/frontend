import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { getNameFromId } from './getNameFromId';
import * as actions from '../actions';

class AddFriend extends Component {
  state = {
    currUser: firebase.auth().currentUser.uid,
    userTwo: this.props.id,
  };

  handleAddFriendRequest = () => {
    const { friendRequest } = this.props;
    const {currUser, userTwo } = this.state;
    const currName = getNameFromId(firebase.auth().currentUser.uid); 
    friendRequest(userTwo, currUser, currName);
  };

  render() {
    return (
      <div>
        <button className='button-main' onClick={this.handleAddFriendRequest}>Add Friend</button>
      </div>
    );
  }
}

export default connect(null, actions)(AddFriend);
