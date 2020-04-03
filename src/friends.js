import React from 'react'
import _ from "lodash";
import * as actions from './actions/friendsActions'
import { connect } from "react-redux";
import { getUserInfoCard } from './utils/getUserInfoCard';
import Requests from './requests';

class Friends extends React.Component {
  componentDidMount(){
    this.props.fetchFriends();
  };

  displayFriends() {  
    const { friends } = this.props;
    return (
      _.map(friends, (value, key) => {
        return (
          <div key={ key }>
            {getUserInfoCard(value.id, null)}                                
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
          {this.displayFriends()}
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

const mapStateToProps = ({friends, requests}) => {
  return {
    friends,
    requests
  };
};

export default connect(mapStateToProps, actions)(Friends);
