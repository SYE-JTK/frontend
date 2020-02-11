import '../ticket/ToDoList.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';
import TicketColumn from '../ticket/TicketColumn.js';
import '../ticket/ticketHomePage.css';
import '../page_layout/page.css';
import store from '../../store';

import * as firebase from 'firebase/app';

import { userRef } from "../../config/firebase";

class ProfileForm extends Component {

  state = {
    addBirthday: "", 
    addGender: ""
  };

  handleBirthdayChange = event => {
    this.setState({ addBirthday: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ addGender: event.target.value });
  };

 
  
  handleFormSubmit = event => {
    const { addBirthday, addGender } = this.state;
    const currUser = firebase.auth().currentUser;
    console.log(currUser.uid)
    var user = userRef.child(currUser.uid);
    console.log(user)

    user.update({
       "birthday": addBirthday,
       "gender": addGender
    });

    event.preventDefault();
    this.setState({ addBirthday: "" });
    this.setState({ addGender: "" })
 
  };


  renderAddForm = () => {
    const { addBirthday, addGender } = this.state;
      return (
        // <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field display-fc-c">
              <div className='display-f-c margin-b-1'>
                <input
                  name='user_birthday'
                  className='input-main margin-r-1'
                  value={addBirthday}
                  onChange={this.handleBirthdayChange}
                  placeholder='Enter Birthday'
                  id="birthday"
                  type="text"
                /> <br/>
              </div>
              <div className='display-f-c margin-b-1'>
                <input
                  name='user_gender'
                  className='input-main margin-r-1'
                  value={addGender}
                  onChange={this.handleGenderChange}
                  placeholder='Enter Gender'
                  id="gender"
                  type="text"
                /> <br/>
              </div>
              <input className='button-main' type="submit" value="Submit"></input>
            </div>
          </form>
        // </div>
      );
    
  };
  
  render() {
    const session = store.getState().session;

    return (
      <div className='main-content'>
      { session.currentUser ?
        <div>
          {this.renderAddForm()}
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

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ProfileForm);