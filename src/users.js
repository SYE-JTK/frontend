import React from 'react'

import _ from "lodash";

import store from './store'
import './components/page_layout/page.css';

import * as firebase from 'firebase/app'

import {userRef} from './config/firebase'


class Users extends React.Component {

  state = {
    name: ""
  }
  
  handleAddFriend = event =>{

    
    const id = event.target.id;
    this.setState({name: event.target.id});
    const currUser = firebase.auth().currentUser;
    console.log(currUser.uid)
    var user = userRef.child(currUser.uid);
    console.log(user)

    user.update({
       "friends": id
    });

    event.preventDefault();
    console.log(id);
  }

 
  displayUsers() {
    const usersState = store.getState().user;
    return (
      _.map(usersState, (value, key) => {
        return (
          <div key={ key }>
            <div className='note-container'>
              { value.email === store.getState().session.currentUser ?
                <div className='note-title'>You ( { value.name } )</div>
                :
                <div className='note-title'>{ value.name }</div>
              }
              <div className='note-content'>{ value.email }</div>
              <button className= 'button-main' id= {value.name} onClick = {this.handleAddFriend} >ADD FRIEND</button>
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


export default Users;