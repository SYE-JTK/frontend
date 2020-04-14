import React from 'react'

import { userRef } from "../config/firebase";
import '../components/page_layout/userCard.css';
import StartConversation from './startConversation';
import AddFriend from './addFriend';

export function getUserInfoCard(id, isFriend) {  
  const thisUserId = id;
  var thisUser = userRef.child(thisUserId);
  var name, smoker, bio, birthday, gender, partier, imageURL;

  thisUser.on('value', snapshot => {
    name = snapshot.child("name").val();
    smoker = snapshot.child("smoker").val();
    bio = snapshot.child("bio").val();
    birthday = snapshot.child("birthday").val();
    gender = snapshot.child("gender").val();
    partier = snapshot.child("partier").val();
    imageURL = snapshot.child("avatarURL").val();  
  });

  function getBirthday(str){
    if(str){
      var bday = new Date(str)
      return bday.toString().slice(4,15)
    }else{
      return ''
    }

  }
  
  return(
    <div>
      <h3 className='user-card-name'>{name}</h3>
      <div className='user-card border rounded p-3 bg-light'>
        <div className='user-card-img'> 
          <img src={imageURL} alt="" className="avatar actual-img"></img>  
        </div>
        <ul className='user-card-answers list-group'>
          <li className='list-group-item'>Birthday: <span className='float-right'>{getBirthday(birthday)}</span></li>
          <li className='list-group-item'>Do I like to party? <span className='float-right'>{partier}</span></li>
          <li className='list-group-item'>Do I smoke? <span className='float-right'>{smoker}</span></li>
          <li className='list-group-item'>Gender: <span className='float-right'>{gender}</span></li>
          <li className='list-group-item'><span className='float-right'>{isFriend}</span></li>
        </ul>
        <div className='user-card-bio'>        
          <h4 className="mb-1">BIO:</h4>     
          <div className="note-content float-left">{bio}</div>
        </div>
        <div className='mt-2'>
          { isFriend?
            <StartConversation id={thisUserId}/>
            :
            <AddFriend id={thisUserId}/>
          }
        </div>
      </div>
    </div>
  )}
