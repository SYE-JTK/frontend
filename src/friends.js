import React from 'react'

import _ from "lodash";

import store from './store'
import * as actions from './actions/friendsActions'
import './components/page_layout/page.css';
import { connect } from "react-redux";
// import Requests from './requests'



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
              <div>{ value.name}</div>                 
          </div>
        )
      })
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












