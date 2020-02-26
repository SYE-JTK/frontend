import React from 'react'

import _ from "lodash";

import store from './store'
import * as actions from './actions/friendsActions'
import { userRef } from "./config/firebase";
import './components/page_layout/page.css';
import './components/note/note.css';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';



class Friends extends React.Component {

  
  componentDidMount(){
    this.props.fetchFriends();
  };
  
  displayFriends() {  
    const friendsState = store.getState().friends;
    return (
      _.map(friendsState, (value, key) => {
        return (
          <div key={ key }>
            {this.getUserInformation(value.id)}                                
          </div>
        )
      })
    )
  };

  getUserInformation(id) {
    const thisUserId = id;
    var thisUser = userRef.child(thisUserId);
    var name, smoker,  bio, birthday, gender, partier, imageURL;

    thisUser.on('value', snapshot => {
      name = snapshot.child("name").val();
      smoker = snapshot.child("smoker").val();
      bio = snapshot.child("bio").val();
      birthday = snapshot.child("birthday").val();
      gender = snapshot.child("gender").val();
      partier = snapshot.child("partier").val();
      imageURL = snapshot.child("avatarURL").val();

    });  
    return(
      <div className = "note-container row mb-4" >   
      <div className = "col-3"> 
        <div className = "note-title">{name}</div>
        <img src={imageURL} className="avatar" wigth = "200" height= "200"></img>  
        <div>Birthday: {birthday}</div>
        <div>Do I like to party? {partier}</div>
        <div>Do I smoke? {smoker}</div>
        <div>Gender: {gender}</div>
      </div>
      <div className = "col-5  border rounded">        
        <h4 className = "m-3 border rounded bg-secondary text-light">BIO:</h4>     
        <div className = "note-content float-left">{bio}</div>
      </div>       
      </div>
    )
  };


render() {
    
    return (
      
      <div>
        <div>
          <h3>Your Friends </h3>
          {this.displayFriends()}
        </div>
      </div>
    );
  }

}
const mapStateToProps = ({friends}) => {
  return {
    friends
  };
};

export default connect(mapStateToProps, actions)(Friends);












