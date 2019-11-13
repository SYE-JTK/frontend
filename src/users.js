import React from 'react'

import _ from "lodash";

import store from './store'

class Users extends React.Component {

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
            </div>
            <br/>
          </div>
        )
      })
    )
  };

  render() {
    return (
      <>
        { 
          store.getState().session.currentUser ?
          <div>
            <h1>
              Users
            </h1>
            <div>
              { this.displayUsers() }
            </div>
          </div>
          :
          <h1>
            Login to see users
          </h1>
        }
      </>
    );
  }
}

export default Users