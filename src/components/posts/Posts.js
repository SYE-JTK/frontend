// eslint-disable-next-line
import React from "react";

import * as firebase from 'firebase/app';

import _ from "lodash";

import { connect } from "react-redux";

import * as actions from "../../actions/notesActions";

import store from '../../store';

class Posts extends React.Component {

  state = {
    noteTitle: "",
    noteContent: "",
    noteOwner: null
  };

  handleTitleChange = event => {
    this.setState({ noteTitle: event.target.value });
    if (this.state.noteOwner === null) {
      this.setState({ noteOwner: store.getState().session.currentUser });
    }
  };

  handleContentChange = event => {
    this.setState({ noteContent: event.target.value });
  };

  handleAddNote = event => {
    const { noteTitle, noteContent, noteOwner } = this.state;
    const { addNotes } = this.props;
    event.preventDefault();
    addNotes({ 
      title: noteTitle,
      content: noteContent, 
      owner: noteOwner 
    });
    this.setState({ noteTitle: "" });
    this.setState({ noteContent: "" });
  };

  renderPosts() {
    const posts = store.getState().notes;
    return (
      _.map(posts, (value, key) => {
        if (value.owner === store.getState().session.currentUser) {
          return (
            <div key={ key }>
            <header>
                <h3>You ({firebase.auth().currentUser.displayName})</h3>
            </header>
              <div className='note-container'>
                <div className='note-title'>{ value.title }</div>
                <div className='note-content'>{ value.content }</div>
              </div>
              <br/>
            </div>
          )
        } else{
            return (
                <div key={ key }>
                <header>
                    <h3>{value.owner}</h3>
                </header>
                  <div className='note-container'>
                    <div className='note-title'>{ value.title }</div>
                    <div className='note-content'>{ value.content }</div>
                  </div>
                  <br/>
                </div>
              ) 
        }
        
      })
    )
  };

  render() {
    const session = store.getState().session;
    return (
      <>
        { session.currentUser ?
          <div>
            <header>
              <h1> Posts </h1>
            </header>
            <div className = "main-content margin-b-3">
              <div>
                { this.renderPosts() }
              </div>
            </div>
            <footer className='margin-l-2'>
            </footer>
          </div>
          :
          <h1>
            Login to see posts
          </h1>
        }
      </>
    )
  }
}

const mapStateToProps = ({ notes }) => {
  return {
    notes
  };
};

export default connect(mapStateToProps, actions)(Posts);