// eslint-disable-next-line
import React from "react";

import _ from "lodash";

import Avatar from '@material-ui/core/Avatar';

import { connect } from "react-redux";

import * as actions from "../../actions/notesActions";

import store from '../../store';

class Posts extends React.Component {



  renderPosts() {
    
    const { posts } = this.props;
    return (
      _.map(posts, (value, key) => {
        if (value.owner === store.getState().session.currentUser) {
          let avatarTitle = value.ownerName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
          return (
            <div key={ key }>
            <div className ="row">
            <Avatar className="mt-2">{avatarTitle}</Avatar>
              <div className='note-container'>
                <div className='note-title'>{ value.title }</div>
                <div className='note-content'>{ value.content }</div>
              </div>
              </div>
              <br/>
              <br/>
            </div>
          )
        } else{
            let avatarTitle = "und"
            if (value.ownerName){
              avatarTitle = value.ownerName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
            }
           
            return (
                <div key={ key }>
                <div className="row">
                <Avatar className="mt-2">{avatarTitle}</Avatar>
                  <div className='note-container'>
                    <div className='note-title'>{ value.title }</div>
                    <div className='note-content'>{ value.content }</div>
                  </div>
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