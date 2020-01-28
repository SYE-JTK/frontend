// eslint-disable-next-line
import React from "react";

import _ from "lodash";

import { connect } from "react-redux";

import * as actions from "../../actions/messagesActions";

import store from '../../store';

class Messages extends React.Component {

  renderConversations() {
    const conversations = store.getState().conversations;
    return (
      _.map(conversations, (value, key) => {
        if (value.owner === store.getState().session.currentUser) {
          return (
            <div key={ key }>
            <div className='note-owner'>You</div>
              <br/>
              <br/>
            </div>
          )
        } else{
          return (
              <div>This</div>
          ) 
        }
      })
    )
  };

  render() {
    return (
      <div className='main-content'>
        <header>
          <h1> Posts </h1>
        </header>
        <div className = "main-content margin-b-3">
          <div>
            { this.renderConversations() }
          </div>
        </div>
        <footer className='margin-l-2'>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.notes
  };
};

export default connect(mapStateToProps, actions)(Messages);