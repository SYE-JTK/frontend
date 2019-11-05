import React from 'react'

import store from './store'

const Users = () => {
  const session = store.getState().session;
  return (
    <>
      { 
        session.currentUser ?
        <div>
          <h1>
            Users
          </h1>
          <div>
            { session.currentUser }
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

export default Users