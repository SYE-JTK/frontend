import '../ticket/ToDoList.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import '../ticket/ticketHomePage.css';
import '../page_layout/page.css';
import store from '../../store';
import './profile.css';

import { Link } from 'react-router-dom';

import * as firebase from 'firebase/app';

import FileUploader from "react-firebase-file-uploader";


import { userRef } from "../../config/firebase";

class ProfileForm extends Component {

  state = {
    addBirthday: "",
    addGender: "",
    addSmoking: "",
    addPartying: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    addBio: "",
  };

  getUserInformation() {
    const currUser = firebase.auth().currentUser;
    var user = userRef.child(currUser.uid);
    user.on('value', snapshot => {
      this.setState({ addName: snapshot.child("name").val() });
      this.setState({ avatarURL: snapshot.child("avatarURL").val() });
      this.setState({ addBirthday: snapshot.child("birthday").val() });
      this.setState({ addGender: snapshot.child("gender").val() });
      this.setState({ addSmoking: snapshot.child("smoker").val() });
      this.setState({ addPartying: snapshot.child("partier").val() });
      this.setState({ addBio: snapshot.child("bio").val() });


    });
  }

  componentDidMount() {
    this.getUserInformation();
  }

  handleBirthdayChange = event => {
    this.setState({ addBirthday: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ addGender: event.target.value });
  };

  handleSmokingChange = event => {
    this.setState({ addSmoking: event.target.value });
  };

  handlePartyingChange = event => {
    this.setState({ addPartying: event.target.value });
  };

  handleBioChange = event => {
    this.setState({ addBio: event.target.value });
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    const currUser = firebase.auth().currentUser;

    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('images/' + currUser.uid + '/')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };


  handleFormSubmit = event => {
    const { addBirthday, addGender, addSmoking, addPartying, avatarURL, addBio } = this.state;
    const currUser = firebase.auth().currentUser;
    var user = userRef.child(currUser.uid);

    user.update({
      "birthday": addBirthday,
      "gender": addGender,
      "smoker": addSmoking,
      "partier": addPartying,
      "avatarURL": avatarURL,
      "bio": addBio
    });

    event.preventDefault();
    this.setState({ isUploading: false });
    this.setState({ progress: 0 });
  };


  renderAddForm = () => {

    const { addBirthday, addGender, addSmoking, addPartying, addBio } = this.state;
    const currUser = firebase.auth().currentUser;
    return (
      // <div id="todo-add-form" className="col s10 offset-s1">
      <form onSubmit={this.handleFormSubmit}>
        <h1 className="heading">Edit Profile</h1>

        <div className="input-field display-fc-c">
          
          <div className='display-f-c margin-b-1'>
            <p className="mr-2 pt-2">Birthday: </p>
            <input
              name='user_birthday'
              className='input-main margin-r-1'
              value={addBirthday}
              onChange={this.handleBirthdayChange}
              placeholder = 'Enter Birthday'
              id="birthday"
              type="text"
            /> <br />
          </div>

          <div className='display-f-c margin-b-1'>
            <p className="mr-2 pt-2">Gender:</p>
            <input
              name='user_gender'
              className='input-main margin-r-1'
              value={addGender}
              onChange={this.handleGenderChange}
              placeholder='Enter Gender'
              id="gender"
              type="text"
            /> <br />
          </div>
          <label>
            Do you smoke? &nbsp;
            <select value={addSmoking} onChange={this.handleSmokingChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            Do you like to party? &nbsp;
            <select value={addPartying} onChange={this.handlePartyingChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>Profile Photo:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress} %</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} style={{width:200, height:200,}} />}
          <br></br>
          <div className="text-center">
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images/" + currUser.uid)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          </div>
          <br></br>
          <p className="text-center ">Bio:</p>
          <div className='display-f-c margin-b-1'>
            <textarea
              name='user_bio'
              className='inputlg'
              value={addBio}
              onChange={this.handleBioChange}
              placeholder='Enter a bit about yourself!'
              id="bio"
              type="text"
              style={{width:400, height:200}}
            /> <br />
          </div>
          <br></br>
          <input className='btn btn-dark' type="submit" value="Update"></input>

          <Link to="/my-profile" className="btn btn-dark mt-3">Save and Return to Profile</Link>
        </div>
      </form>



    );

  };

  render() {
    const session = store.getState().session;

    return (

      <div className='main-content'>
        {session.currentUser ?
          <div>
            {this.renderAddForm()}
          </div>
          :
          <h1>
            Login edit profile
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