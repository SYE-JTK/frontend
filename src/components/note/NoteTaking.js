// eslint-disable-next-line
import React from "react";

import '../ticketHomePage.css';
import '../page_layout/page.css';
import './note.css';

import _ from "lodash";

import { connect } from "react-redux";

import * as actions from "../../actions/notesActions";

import store from '../../store';

class NoteTaking extends React.Component {

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

  renderNotes() {
    const notes = store.getState().notes;
    return (
      _.map(notes, (value, key) => {
        if (value.owner === store.getState().session.currentUser) {
          return (
            <div>
              <div key={ key } className='note-container'>
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

  componentWillMount() {
    this.props.fetchNotes();
  }

  render() {
    const session = store.getState().session;
    return (
      <>
        { session.currentUser ?
          <div>
            <header>
              <h1> Notes </h1>
            </header>
            <div className = "main-content margin-b-3">
              <div>
                { this.renderNotes() }
              </div>
            </div>
            <footer className='margin-l-2'>
              <form onSubmit = {this.addNote}> 
                <input
                  className='input-main margin-b-2'
                  type="text"
                  onChange={ this.handleTitleChange }
                  placeholder = "Enter note title here"
                /><br/>
                <textarea
                  className='textarea-main margin-b-2' 
                  placeholder = "Enter note here"
                  onChange={ this.handleContentChange }
                /><br/>
                <button
                  className='button-main'
                  type="submit"
                  onClick={ this.handleAddNote }
                >Add Note</button>
              </form>
            </footer>
          </div>
          :
          <h1>
            Login to take notes
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

export default connect(mapStateToProps, actions)(NoteTaking);

