import React from 'react'
import _ from "lodash";
import * as actions from '../../actions'
import { connect } from "react-redux";
import { getUserInfoCard } from '../../utils/getUserInfoCard';
import Requests from '../../requests';

class HomePage extends React.Component {

  componentDidMount(){
    this.props.fetchUsers();
  };
  
  displayUsers() {  
    const { user } = this.props;
    return (
      _.map(user, (value, key) => {
        return (
          <div key={ key }>
            {getUserInfoCard(value.id)}                          
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
