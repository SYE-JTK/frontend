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
              <div className='note-content'>{ value.email }</div>
            </div>
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