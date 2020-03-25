import React from 'react'
import _ from "lodash";
import * as actions from '../../actions'
import { connect } from "react-redux";
import { getUserInfoCard } from '../../utils/getUserInfoCard';
import Requests from '../../requests';
import store from '../../store'
import * as firebase from "firebase/app";
import { getNameFromId } from '../../utils/getNameFromId';


export const alreadyFriends = (id) => {
  const friends = store.getState().friends;
  for (var key in friends) {
    
    if (friends[key].id === id) {
 
      return true;
    }
  }
}

class HomePage extends React.Component {

  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchRequests();
    this.props.fetchFriends();
  };

  handleAddFriendRequest = event =>{
    const { friendRequest } = this.props;
    const anId = event.target.id; 
    const currId = firebase.auth().currentUser.uid; 
    const currName = getNameFromId(firebase.auth().currentUser.uid); 
    friendRequest(anId, currId, currName);
   

  };
  
  displayUsers() {  
    const { user } = this.props;
    return (
      _.map(user, (value, key) => {
        return (
          <div key={ key }>
            {getUserInfoCard(value.id)}
            {alreadyFriends(value.id)?
            <div></div>
            :
            <button className= 'button-main' id= {value.id} name={value.name} onClick = {this.handleAddFriendRequest} >add friend</button>}                          
          </div>
        )
      })
    )
  };

  render() {
    const { requests } = this.props;
    return (
      <div className='row mb-4 mt-3'>
        <div className={requests ? 'col-1' : 'col-2'}></div>
        <div className={requests ? 'col-7' : 'col-8'}>
          {this.displayUsers()}
        </div>
        { requests ?
          <>
            <div className='col-3'>
                <Requests/>
            </div>
            <div className='col-1' style={{paddingRight: 0 + 'px'}}></div>
          </>
          :
          <div className='col-2'></div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({user, requests}) => {
  return {
    user,
    requests
  };
};

export default connect(mapStateToProps, actions)(HomePage);
