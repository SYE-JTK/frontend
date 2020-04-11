import '../ticket/ToDoList.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import '../ticket/ticketHomePage.css';
import '../page_layout/page.css';
import store from '../../store';
import './profile.css';

import * as firebase from 'firebase/app';

import FileUploader from "react-firebase-file-uploader";

import DatePicker from 'react-date-picker';
import { userRef } from "../../config/firebase";
import { thisExpression } from '@babel/types';

class ProfileForm extends Component {

  state = {
    date: new Date(),
    addGender: "",
    addSmoking: "",
    addPartying: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    addBio: "",
    addCleanliness:"", 
    addWakeUp:"",
    addBedTime: ""
  };

  getUserInformation() {
    const currUser = firebase.auth().currentUser;
    var user = userRef.child(currUser.uid);
    user.on('value', snapshot => {
      this.setState({ addName: snapshot.child("name").val() });
      this.setState({ avatarURL: snapshot.child("avatarURL").val() });
      this.setState({ date: new Date(snapshot.child("birthday").val()) });
      this.setState({ addGender: snapshot.child("gender").val() });
      this.setState({ addSmoking: snapshot.child("smoker").val() });
      this.setState({ addPartying: snapshot.child("partier").val() });
      this.setState({ addBio: snapshot.child("bio").val() });
      this.setState({ addCleanliness: snapshot.child("cleanliness").val() });
      this.setState({ addWakeUp: snapshot.child("wakeup").val() });
      this.setState({ addBedTime: snapshot.child("bedtime").val()});


    });
  }

  componentDidMount() {
    this.getUserInformation();
  }

  onBirthdayChange = date => this.setState({ date })


  handleGenderChange = event => {
    this.setState({ addGender: event.target.value });
  };

  handleSmokingChange = event => {
    this.setState({ addSmoking: event.target.value });
  };

  handlePartyingChange = event => {
    this.setState({ addPartying: event.target.value });
  };

  handleCleanlinessChange = event => {
    this.setState({ addCleanliness: event.target.value });
  };

  handleWakeUpChange = event => {
    this.setState({ addWakeUp : event.target.value });
  };

  handleBedTimeChange = event => {
    this.setState({ addBedTime : event.target.value });
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
    const { date, addGender, addSmoking, addPartying, avatarURL, addBio, addCleanliness, addWakeUp, addBedTime } = this.state;
    const currUser = firebase.auth().currentUser;
    var user = userRef.child(currUser.uid);

    user.update({
      "birthday": date,
      "gender": addGender,
      "smoker": addSmoking,
      "partier": addPartying,
      "cleanliness": addCleanliness,
      "avatarURL": avatarURL,
      "bio": addBio, 
      "wakeup": addWakeUp,
      "bedtime": addBedTime,
    });

    event.preventDefault();
    this.setState({ isUploading: false });
    this.setState({ progress: 0 });
    this.props.history.push('/my-profile');
  };


  renderAddForm = () => {

    const { date, addGender, addSmoking, addPartying, addBio, addCleanliness, addWakeUp, addBedTime } = this.state;
    const currUser = firebase.auth().currentUser;
    return (

      <form onSubmit={this.handleFormSubmit}>
        <h1 className="heading">Edit Profile</h1>

        <div className="container">
          <div className="row">
            <div className="col-sm border rounded p-3">
              <h2 className="bg-secondary border rounded text-light text-sm text-center">Profile Photo</h2>
              {this.state.isUploading && <p>Progress: {this.state.progress} %</p>}
              {this.state.avatarURL && <img alt='' className="rounded" src={this.state.avatarURL} style={{ width: '100%', height: 'auto', }} />}
              <br></br>
              <div className="mt-3 ml-7">
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
            </div>

            <div className="col-sm border rounded p-3 ml-1">
              <h2 className="bg-secondary border rounded text-light text-sm text-center">Basic Info</h2>
              <div>
                <p className="">Birthday: </p>
                <DatePicker
                  onChange={this.onBirthdayChange}
                  value={date}
                />
              </div>



              <div className='form-group mt-3'>
                <label className="">Gender:</label>
                <input
                  name='user_gender'
                  className='form-control'
                  value={addGender}
                  onChange={this.handleGenderChange}
                  placeholder='Enter Gender'
                  id="gender"
                  type="text"
                />
              </div>

              <div className="form-group">
                <label className="">
                  Do you smoke? &nbsp;
              <select className="form-control" value={addSmoking} onChange={this.handleSmokingChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
              <div className="form-group">
                <label className="">
                  Do you like to party? &nbsp;
                <select className="form-control" value={addPartying} onChange={this.handlePartyingChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>
              <div className="form-group">
                <label className="">
                  How clean are you? &nbsp;
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="Clean"
                        checked={addCleanliness === "Clean"}
                        className="form-check-input"
                        onChange={this.handleCleanlinessChange}
                      />
                      Clean
                      </label>
                  </div>

                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="So-so"
                        checked={addCleanliness === "So-so"}
                        className="form-check-input"
                        onChange={this.handleCleanlinessChange}
                      />
                      So-so
                      </label>
                  </div>

                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="Messy"
                        checked={addCleanliness === "Messy"}
                        className="form-check-input"
                        onChange={this.handleCleanlinessChange}
                      />
                      Messy
                      </label>
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label className="">
                  Do you wake up early? &nbsp;
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="Yes"
                        checked={addWakeUp === "Yes"}
                        className="form-check-input"
                        onChange={this.handleWakeUpChange}
                      />
                      Yes
                      </label>
                  </div>

                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="No"
                        checked={addWakeUp === "No"}
                        className="form-check-input"
                        onChange={this.handleWakeUpChange}
                      />
                      No
                      </label>
                  </div>
                </label>
              </div>

              <div className="form-group">
                <label className="">
                  Do you go to bed late? &nbsp;
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="Yes"
                        checked={addBedTime === "Yes"}
                        className="form-check-input"
                        onChange={this.handleBedTimeChange}
                      />
                      Yes
                      </label>
                  </div>

                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name=""
                        value="No"
                        checked={addBedTime === "No"}
                        className="form-check-input"
                        onChange={this.handleBedTimeChange}
                      />
                      No
                      </label>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-3">

          <div className='form-group'>
            <h2 className="bg-secondary border rounded text-light text-sm text-center">Bio</h2>
            <textarea
              name='user_bio'
              className='form-control'
              value={addBio}
              onChange={this.handleBioChange}
              placeholder='Enter a bit about yourself!'
              id="bio"
              type="text"
              style={{ width: 400, height: 200 }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className='btn btn-dark mt-2 text-center' type="submit" value="Update">Save and Return to Profile</button>
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