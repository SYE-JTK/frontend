
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/messagesActions';
import '../page_layout/page.css';
import store from '../../store';
import * as firebase from 'firebase';
import './messaging.css';

class Messages extends Component {
  state = {
    newMessageContent: "",
    newMessageUser1: firebase.auth().currentUser.uid,
    newMessageUser2: ""
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
                key='message_content'
              /> <br/>
              <input className='button-main' type="submit" value="Submit" key='submit'></input>
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
    return (
      <div>
       {
         _.map(conversations, (value, key) => {
            if ((value.user1 === newMessageUser2) || (value.user2 === newMessageUser2)) {
              return(
                _.map(value.conversation, (value, key) => {
                  console.log(value.content);
                  if (value.sender === newMessageUser1) {
                    console.log("sender");
                    return(
                      <>
                      <div key={value.id} className='from-you'>
                        You: {value.content}
                      </div>
                      <br/>
                      </>
                    )
                  } else {
                    return (
                      <>
                      <div key={value.id} className='from-them'>
                        {newMessageUser2}: {value.content}
                      </div>
                      <br/>
                      </>
                    )
                  }
                })
              );
            }
          })
        }
      </div>
    )
  }
  
  render() {
    const session = store.getState().session;
    console.log(this.state.newMessageUser2);
    return (
      <div className='main-content'>
      { session.currentUser ?
        <div>
          {this.renderConversations()}
          <br/>
          <br/>
          {this.renderMessages()}
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
