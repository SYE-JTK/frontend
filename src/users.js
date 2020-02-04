import React from 'react'

import _ from "lodash";

import store from './store'
import './components/page_layout/page.css';
// import user from './reducers/userReducer';
// import { async } from 'q';

class Users extends React.Component {
  handleClick = (event) => {

      event.preventDefault();
      console.log("here");
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
              <button className= 'friend-button' onClick = {this.handleClick}>ADD FRIEND</button>

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

export default Users