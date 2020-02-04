
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/messagesActions';
import '../page_layout/page.css';
import store from '../../store';
import * as firebase from 'firebase';

class Messages extends Component {
  state = {
    newMessageContent: "",
    newMessageUser1: firebase.auth().currentUser.uid,
    newMessageUser2: ""
  };

  handleNewMessageContent = event => {
    this.setState({ newMessageContent: event.target.value });
  };

  handlePickUser = id => {
    this.setState({ newMessageUser2: id });
  };

  handleFormSubmit = event => {
    const { newMessageContent, newMessageUser1, newMessageUser2 } = this.state;
    const { sendMessage } = this.props;
    event.preventDefault();
    sendMessage({ 
      content: newMessageContent, 
      user1: newMessageUser1, 
      user2: newMessageUser2
    });
    this.setState({ newMessageContent: "" });
    this.setState({ newMessageUser2: "" });
  };

  handleNewConversation = () => {
    const { newMessageUser1, newMessageUser2 } = this.state;
    const { startNewConversation } = this.props;
    startNewConversation({
      user1: newMessageUser1,
      user2: newMessageUser2
    });
  }

  renderMessageField = () => {
    const { newMessageContent } = this.state;
    return (
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-field display-fc-c">
            <div className='display-f-c margin-b-1'>
              <input
                name='message_content'
                className='input-main margin-r-1'
                value={newMessageContent}
                onChange={this.handleNewMessageContent}
                placeholder='message'
                id="messageContent"
                type="text"
              /> <br/>
              <input className='button-main' type="submit" value="Submit"></input>
            </div>
          </div>
        </form>
    );
  };

  renderNewConversationField = () => {
    const { newMessageUser2 } = this.state;
    return (
        <form onSubmit={this.handleNewConversation}>
          <div className="input-field display-fc-c">
            <div className='display-f-c margin-b-1'>
              <input
                name='new_conversation'
                className='input-main margin-r-1'
                value={newMessageUser2}
                onChange={this.handlePickUser}
                placeholder='new conversation'
                id="newConversation"
                type="text"
              /> <br/>
              <input className='button-main' type="submit" value="Submit"></input>
            </div>
          </div>
        </form>
    );
  };


  renderConversations() {
    const { conversations } = this.props;
    return (
      <div>
       {
         _.map(conversations, (value, key) => {
            return (
              <div key={key}>
                {
                  (value.user1 === firebase.auth().currentUser.uid) ?
                  <a href='#' onClick={this.handlePickUser(value.user2)}>
                    {value.user2}
                  </a>
                  :
                  <a href='#' onClick={this.handlePickUser(value.user1)}>
                    {value.user1}
                  </a>
                }
              </div>
            )
          })
        }
      </div>
    )

  }
  
  render() {
    const session = store.getState().session;
    return (
      <div className='main-content'>
      { session.currentUser ?
        <div>
          {this.renderConversations()}
          <br/>
          <br/>
          <br/>
          {this.renderMessageField()}
          <br/>
        </div>
        :
        <h1>
          Login to see tickets
        </h1>
      }
      </div>
    );
  }
}

const mapStateToProps = ({ conversations }) => {
  return {
    conversations
  };
};

export default connect(mapStateToProps, actions)(Messages);
