// eslint-disable-next-line
import React from "react";

import * as firebase from 'firebase/app';

import _ from "lodash";

import { connect } from "react-redux";

import * as actions from "../../actions/notesActions";

import store from '../../store';

class Posts extends React.Component {

  renderPosts() {
    const { posts } = this.props;
    return (
      _.map(posts, (value, key) => {
        if (value.owner === store.getState().session.currentUser) {
          return (
            <div key={ key }>
            <div className='note-owner'>You</div>
              <div className='note-container'>
                <div className='note-title'>{ value.title }</div>
                <div className='note-content'>{ value.content }</div>
              </div>
              <br/>
              <br/>
            </div>
          )
        } else{
            return (
                <div key={ key }>
                <div className='note-owner'>{ value.ownerName }</div>
                  <div className='note-container'>
                    <div className='note-title'>{ value.title }</div>
                    <div className='note-content'>{ value.content }</div>
                  </div>
                  <br/>
                  <br/>
                </div>
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
            { this.renderPosts() }
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

export default connect(mapStateToProps, actions)(Posts);