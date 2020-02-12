import React, { Component } from 'react';
import _ from 'lodash';

class ConversationSearch extends Component {
    state = {
        query: '',
        data: null,
        guesses: null
    }

    handleInputChange = event => {
      this.setState({ query: event.target.value }, this.filterArray);
    };

    getData = () => {
      const responseData = {
        friends: {
          1: {
            name: "jonas",
            id: 1
          },
          2: {
            name: "kira",
            id: 2
          },
          3: {
            name: "tim",
            id: 3
          },
          4: {
            name: "kirsten",
            id: 4
          },
        }
      }
      var fixedData = [];
      _.map(Object.values(responseData.friends), (value, key) => {
        fixedData.push(value.name);
      })
      this.setState({data: fixedData})
    }

    filterArray = () => {
      var searchString = this.state.query;
      var responseData = this.state.data;
      var newData = [];
      if(searchString.length > 0){
        responseData.filter(l => {
          if(l.toLowerCase().match(searchString.toLowerCase())) {
            newData.push(l.toLowerCase().match(searchString.toLowerCase()).input);
          }
        })
      }
      this.setState({guesses: newData})
    }

    componentWillMount() {
        this.getData();
    }
    render() {
      return (
          <div>
              <form autoComplete="off">
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
                          <a href="#" className='suggestions'>{value}</a>
                        )
                      })
                  }
              </div>
          </div>
      )
    }
}


export default ConversationSearch;