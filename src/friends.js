import React from 'react'

import _ from "lodash";

import store from './store'
import './components/page_layout/page.css';


class Friends extends React.Component {

  displayFriends() {
    const usersState = store.getState().user;
    return (
      _.map(usersState, (value, key) => {
        return (
          <div key={ key }>
              <div>{ value.friends }</div>          
            <br/>
          </div>
        )
      })
    )
  };


    render() {
        return (
          <div>
            <h1>
              Friends
            </h1>
            <div className= 'addFriends'>
              Friend Requests
              <li >
                Tim Jones
              </li>
              <button className= 'button-main' >ADD FRIEND</button>
              <li>
                Kira Murphy
              </li>
              <button className= 'button-main' >ADD FRIEND</button>
            </div>
            <div className = 'listFriends'>
                List of Friends
                {this.displayFriends()}
            </div>
          </div>
        );
      }

}

export default Friends;












