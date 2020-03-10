import React from 'react'

import _ from "lodash";

import { userRef } from "../config/firebase";
import '../components/page_layout/userCard.css';

export function getUserInfoCard(id) {
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
    <div>
      <h3 className='user-card-name'>{name}</h3>
      <div className='user-card border rounded p-3 bg-light'>
        <div className='user-card-img'> 
          <img src={imageURL} className="avatar actual-img"></img>  
        </div>
        <ul className='user-card-answers list-group'>
          <li className='list-group-item'>Birthday: <span className='float-right'>{birthday}</span></li>
          <li className='list-group-item'>Do I like to party? <span className='float-right'>{partier}</span></li>
          <li className='list-group-item'>Do I smoke? <span className='float-right'>{smoker}</span></li>
          <li className='list-group-item'>Gender: <span className='float-right'>{gender}</span></li>
        </ul>
        <div className='user-card-bio'>        
          <h4 className="mb-1">BIO:</h4>     
          <div className="note-content float-left">{bio}</div>
        </div>
      </div>
    </div>
  )
};