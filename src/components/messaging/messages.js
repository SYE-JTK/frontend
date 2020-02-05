
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/messagesActions';
import '../page_layout/page.css';
import store from '../../store';
import * as firebase from 'firebase';
import './messaging.css';

import { getNameFromId } from '../../utils/getNameFromId';

import Avatar from '@material-ui/core/Avatar';

class Messages extends Component {
  state = {
    newMessageContent: "",
    newMessageUser1: firebase.auth().currentUser.uid,
    newMessageUser2: "",
    time: Date.now()
  };

  handleNewMessageContent = event => {
    this.setState({ newMessageContent: event.target.value });
  };

  handlePickUser = event => {
    this.setState({ newMessageUser2: event.target.value });

  };

  handlePickExistingUser = (id) => {
    this.setState({ newMessageUser2: id });
  };

  handleFormSubmit = event => {
    const { newMessageContent, newMessageUser1, newMessageUser2 } = this.state;
    const { sendMessage } = this.props;
    event.preventDefault();
    if (newMessageUser2) {
      sendMessage({ 
        content: newMessageContent, 
        user1: newMessageUser1, 
        user2: newMessageUser2
      });
    }
    this.setState({ newMessageContent: "" });
  };

  handleNewConversation = () => {
    const { newMessageUser2 } = this.state;
    const { user } = this.props;
    return (
      <>
        <select value={newMessageUser2} onChange={this.handlePickUser}>
        {
          _.map(user, (value, key) => {
            return (
              <option value={value.id} key={value.id}>{value.email}</option>
            )
          })
        }
        </select>
        <button className='button-main ml-3' onClick={this.handleCreateNewConversation}>
          New Conversation
        </button>
      </>
    )
  }

  handleCreateNewConversation = () => {
    const { newMessageUser1, newMessageUser2 } = this.state;
    const { startNewConversation } = this.props;
    if (newMessageUser2) {
      startNewConversation({
        user1: newMessageUser1,
        user2: newMessageUser2
      })
    }
  }

  componentDidMount() {
    const { newMessageUser1 } = this.state;
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 100);
    if (newMessageUser1){
      this.props.fetchConversations(newMessageUser1);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderMessageField = () => {
    const { newMessageContent, newMessageUser2 , newMessageUser1} = this.state;
    if (newMessageUser2 && (newMessageUser2 !== newMessageUser1)) {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-field display-fc-c">
            <div className='display-f-c margin-b-1'>
              <textarea
                name='message_content'
                className='input-main margin-r-1'
                value={newMessageContent}
                onChange={this.handleNewMessageContent}
                placeholder='message'
                id="messageContent"
                type="text"
                key='message_content'
              /> <br/>
              <input className='button-main' type="submit" value="Send" key='send'></input>
            </div>
          </div>
        </form>
      );
    }
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
      <ul>
       {
         _.map(conversations, (value, key) => {
            return (
              <>
                {
                  (value.user1 === firebase.auth().currentUser.uid) ?
                  <li key={value.user2}>
                    <button onClick={() => this.handlePickExistingUser(value.user2)}>{value.user2}</button>
                  </li>
                  :
                  <li key={value.user2}>
                    <button onClick={() => this.handlePickExistingUser(value.user1)}>{value.user1}</button>
                  </li>
                }
              </>
            )
          })
        }
      </ul>
    )
  }

  renderMessages = () => {
    const { conversations } = this.props;
    const { newMessageUser2, newMessageUser1 } = this.state;
    if (newMessageUser2 && (newMessageUser2 !== newMessageUser1)) {
      return (
        <div className='message-field'>
        {
          _.map(conversations, (value, key) => {
            if(newMessageUser2) {
              if ((value.user1 === newMessageUser2) || (value.user2 === newMessageUser2)) {
                const av1 = getNameFromId(newMessageUser1).split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
                const av2 = getNameFromId(newMessageUser2).split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
                return(
                  _.map(value.conversation, (value, key) => {
                    if (value.sender === newMessageUser1) {
                      return(
                        <div key={value.id} className='message-container'>
                          <div className='from-you'>
                            <div className='speech-bubble-you'>
                              {value.content}
                            </div>
                            <Avatar className="mt-1 mb-2">{av1}</Avatar>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div key={value.id} className='message-container'>
                          <div className='from-them'>
                            <Avatar className="mt-1 mb-2">{av2}</Avatar>
                            <div className='speech-bubble-them'>
                              {value.content}
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                );
              }
          }})
          }
        </div>
      )
    }
  }
  
  render() {
    const session = store.getState().session;
    const {newMessageUser2, newMessageUser1 } = this.state;
    return (
      <div className='main-content'>
      { session.currentUser ?
        <div className='message-field-header'>
          {this.handleNewConversation()}
          <br/>
          {newMessageUser2 && (newMessageUser2 !== newMessageUser1) ?
            <h5 className='mt-3'>Your conversation with {getNameFromId(newMessageUser2)}</h5>
            :
            <h5 className='mt-3'>Pick Someone to Chat With</h5>
          }
          <br/>
          {this.renderMessages()}
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

const mapStateToProps = ({ conversations, user }) => {
  return {
    conversations,
    user
  };
};

export default connect(mapStateToProps, actions)(Messages);
