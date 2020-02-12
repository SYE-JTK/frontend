
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';
import '../page_layout/page.css';
import store from '../../store';
import * as firebase from 'firebase';
import './messaging.css';
import { getNameFromId } from '../../utils/getNameFromId';

import Avatar from '@material-ui/core/Avatar';
import ConversationSearch from './conversationSearch';

class Messages extends Component {
  state = {
    newMessageContent: "",
    newMessageUser1: firebase.auth().currentUser.uid,
    newMessageUser2: "",
    time: Date.now(),
    messages: null
  };

  scrollToBottom = () => {
    if (this.state.newMessageUser2) {
      this.messagesEnd.scrollIntoView(false);
    }
  }

  handleNewMessageContent = event => {
    this.scrollToBottom();
    this.setState({ newMessageContent: event.target.value });
  };

  handlePickUser = event => {
    this.setState({ newMessageUser2: event.target.value });
  };

  handlePickExistingUser = (id) => {
    this.setState({ newMessageUser2: id }, this.fetchAConversation);
  };

  fetchAConversation = () => {
    this.props.fetchSingleConversation(this.state.newMessageUser1, this.state.newMessageUser2);
  }

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

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      this.handleFormSubmit(e)
    }
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessageField = () => {
    const { newMessageContent, newMessageUser2 , newMessageUser1} = this.state;
    if (newMessageUser2 && (newMessageUser2 !== newMessageUser1)) {
      return (
        <form ref={el => this.myFormRef = el} onSubmit={this.handleFormSubmit}>
          <div className="input-field display-fc-c w-100 mt-2">
            <div className='display-f-c margin-b-1 w-100'>
              <textarea
                ref={c=>this.textarea=c}
                name='message_content'
                className='message-input'
                value={newMessageContent}
                onChange={this.handleNewMessageContent}
                placeholder='message'
                id="messageContent"
                type="text"
                key='message_content'
                onKeyDown={this.onEnterPress}
              /> <br/>
              <input className='button-blue' type="submit" value="Send" key='send'></input>
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
      <div className='conversation-field' id='conversation-field'>
        <ConversationSearch/>
       {
         _.map(conversations, (value, key) => {
            const lastText = value.conversation[Object.keys(value.conversation)[Object.keys(value.conversation).length-1]]
            const user = (value.user1 === firebase.auth().currentUser.uid) ? value.user2 : value.user1;
            return (
              <div 
                className={
                  this.state.newMessageUser2 === user ? 'active single-conversation' : 'single-conversation'
                }
                key={user}
              >
                <div className='chat_people'>
                  <Avatar className='chat_img'>
                    {getNameFromId(user).split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')}
                  </Avatar>
                  <button
                    className='chat_ib'
                    id={user}
                    onClick={() => this.handlePickExistingUser(user)}
                  >
                    <h5>{getNameFromId(user)}</h5>
                    <p>
                      {lastText.content}
                    </p>
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  renderMessages = () => {
    const { currentConversation } = this.props;
    const { newMessageUser2, newMessageUser1 } = this.state;
    if (newMessageUser2 && (newMessageUser2 !== newMessageUser1)) {
      return (
        <div className='message-box'>
          <div className='message-field'>
            {
              _.map(currentConversation, (value, key) => {
                if(newMessageUser2) {
                  const av1 = getNameFromId(newMessageUser1).split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
                  const av2 = getNameFromId(newMessageUser2).split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
                  return(
                    <div key={value.id} className='message-container'>
                      {(value.sender === newMessageUser1) ?
                        <div className='from-you'>
                          <div className='speech-bubble-you'>
                            {value.content}
                          </div>
                          <Avatar className="mt-1 mb-2">{av1}</Avatar>
                        </div>
                        :
                        <>
                        { (newMessageUser2 === value.sender) ?
                          <div className='from-them'>
                            <Avatar className="mt-1 mb-2">{av2}</Avatar>
                            <div className='speech-bubble-them'>
                              {value.content}
                            </div>
                          </div>
                          :
                          <></>
                        }
                        </>
                      }
                    </div>
                    )
                  }
                }
              )
            }
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    this.props.fetchConversations(this.state.newMessageUser1)
  }
  
  render() {
    const session = store.getState().session;
    const {newMessageUser2, newMessageUser1 } = this.state;
    return (
      <div className='main-content'>
        { session.currentUser ?
        <div className='message-page'>
          {this.renderConversations()}
          <div className='message-field-header'>
            {newMessageUser2 && (newMessageUser2 !== newMessageUser1) ?
              <h5 className='mt-2'>{getNameFromId(newMessageUser2)}</h5>
              :
              <h4 className='no-message-selected'>Pick Someone to Chat With</h4>
            }
            {this.renderMessages()}
            {this.renderMessageField()}
          </div>
        </div>
          :
          <h1>
            Login to see messages
          </h1>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ conversations, currentConversation }) => {
  return {
    conversations,
    currentConversation
  };
};

export default connect(mapStateToProps, actions)(Messages);
