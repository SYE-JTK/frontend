import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';
import * as firebase from 'firebase';

class ConversationSearch extends Component {
  // get state of 
  state = {
      query: '',
      data: null,
      guesses: null
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value }, this.filterArray);
  };

  handleNameClick = event => {
    const { setCurrentConvo, startNewConversation, fetchSingleConversation } = this.props;
    const users = {'user1': firebase.auth().currentUser.uid, 'user2': event.target.value}
    let less = (users.user1 < users.user2) ? users.user1 : users.user2;
    let more = (users.user1 > users.user2) ? users.user1 : users.user2;
    this.setState({ guesses: null, query: ''});
    document.getElementById("conversationSearchInput").reset();
    setCurrentConvo(event.target.value);
    startNewConversation(users);
    fetchSingleConversation(`${less}@${more}`);
  };

  filterArray = () => {
    const { friends } = this.props;
    let fixedData = [];
    _.map(Object.values(friends), (value, key) => {
      let obj = {};
      obj['id'] = value.id;
      obj['name'] = value.name;
      fixedData.push(obj);
    })
    var searchString = this.state.query;
    if(searchString.length > 0){
      var newData = fixedData.filter(l => {
        if (l.name.toLowerCase().match(searchString.toLowerCase())) {
          return l;
        }
        return null;
      })
      this.setState({guesses: newData})
    }
  }

  componentDidMount() {
    this.props.fetchFriends()
  }

  render() {
    return (
      <div className='conversation-search'>
        <form autoComplete="off" id="conversationSearchInput">
            <input
              value={this.query}
              className='search-field'
              type="text" 
              id="filter"
              placeholder="Search for friends..." 
              ref={input => this.search = input} 
              onChange={this.handleInputChange}
            />
        </form>
        <div className='suggestion-field'>
            {
                _.map(this.state.guesses, (value, key) => {
                  return (
                    <button
                      key={value.id} 
                      value={value.id} 
                      onClick={this.handleNameClick}
                      className='suggestions'
                    >
                      {value.name}
                    </button>
                  )
                })
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ friends }) => {
  return {
    friends
  };
};

export default connect(mapStateToProps, actions)(ConversationSearch);