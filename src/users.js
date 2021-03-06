import React from 'react'
import _ from "lodash";
import store from './store'
import './components/page_layout/page.css';
import { getNameFromId } from './utils/getNameFromId';
import * as firebase from "firebase/app";
import { connect } from "react-redux";
import * as actions from './actions/friendsActions'

import getAvatar from "./utils/generateAvatar.js"

export const alreadyFriends = (id) => {
  const friends = store.getState().friends;
  for (var key in friends) {
    
    if (friends[key].id === id) {
 
      return true;
    }
  }
}

class Users extends React.Component {

  state = {
    name: "",
    id: "", 
    
  }
  
  componentDidMount(){
    this.props.fetchFriends();
    this.props.fetchRequests();
  };
  
  handleAddFriendRequest = event =>{
    const { friendRequest } = this.props;
    const anId = event.target.id; 
    const currId = firebase.auth().currentUser.uid; 
    const currName = getNameFromId(firebase.auth().currentUser.uid); 
    friendRequest(anId, currId, currName);
   

  };
  
  displayUsers() {
    const usersState = store.getState().user;
    return (
      _.map(usersState, (value, key) => {
        return (
          <div key={ key }>
            <div className='note-container'>
              { value.email === store.getState().session.currentUser ?
                <div></div>
                :
                <div>
                {getAvatar(value.name, alreadyFriends(value.id))}
                <div className='note-title'>{ value.name }</div>
                {} 
                </div>
              }
                       
            </div>
            <br/>
          </div>
        )
      })
    )
  };

  render() {
    return (
      <div className='main-content'>
        <h1>
          Users
        </h1>
        <div>
          { this.displayUsers() }
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ friends, requests }) => {
  return {
    friends, requests
  };
};

export default connect(mapStateToProps, actions)(Users);