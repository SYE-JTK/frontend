import React from 'react'
import _ from "lodash";
import store from './store'
import * as actions from './actions/friendsActions'
import './components/page_layout/page.css';
import { connect } from "react-redux";

class Requests extends React.Component {
  state = {
    name: " ",
    id: ""

  }

  componentDidMount() {
    this.props.fetchRequests();
  };
  
  handleClick = event => {
    const anId = event.target.id;
    const aName = event.target.name;
  
    const { deleteRequest, addFriends } = this.props;
    console.log(anId)
    deleteRequest(anId);
    
    addFriends({
      name: aName,
      id: anId
    }); 
    
    event.preventDefault();
  }
  

  displayRequests() { 
    const requestState = store.getState().requests;
    return (
      _.map(requestState, (value, key) => {
        return (
          <div key={ key }>
              <div> {value.name}</div>   
              <button className= 'button-main' id= {value.id} name={value.name} onClick = {this.handleClick} >add friend</button>           
          </div>   
        )
      })
    )
  };
  

render() {
    return (
      <div>
        <div>
          <h4>Friend Requests</h4>
          {this.displayRequests()}       
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({requests}) => {
  return {
    requests
  };
};

export default connect(mapStateToProps, actions)(Requests);