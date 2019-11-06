import "./ToDoList.css";
import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import TicketColumn from './TicketColumn';
import './ticketHomePage.css';
import './page_layout/page.css';

import store from '../store'

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: "",
    addFormDescription: "",
    addFormOwner: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ addFormDescription: event.target.value });
  };

  handleOwnerChange = event => {
    this.setState({ addFormOwner: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue, addFormDescription, addFormOwner } = this.state;
    const { addTicket } = this.props;
    event.preventDefault();
    addTicket({ 
      title: addFormValue, status: 'Pending', 
      description: addFormDescription, 
      owner: addFormOwner 
    });
    this.setState({ addFormValue: "" });
    this.setState({ addFormStatus: "" });
    this.setState({ addFormOwner: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue, addFormDescription, addFormOwner } = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field display-fc-c">
              <div className='display-f-c margin-b-1'>
                <input
                  className='input-main margin-r-1'
                  value={addFormValue}
                  onChange={this.handleInputChange}
                  placeholder='enter ticket title'
                  id="ticketTitle"
                  type="text"
                /> <br/>
                <input
                  className='input-main margin-l-1'
                  value={addFormOwner}
                  onChange={this.handleOwnerChange}
                  placeholder='enter ticket owner'
                  id="ticketOwner"
                  type="text"
                /> <br/>
              </div>
              <textarea
                className='textarea-main'
                value={addFormDescription}
                onChange={this.handleDescriptionChange}
                placeholder='enter ticket description'
                id="ticketDescription"
                type="textarea"
              /><br/>
              <input className='button-main' type="submit" value="Submit"></input>
            </div>
          </form>
        </div>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;

    const pendingTickets = [];
    const startedTickets = [];
    const reviewingTickets = [];
    const doneTickets = [];

    _.map(data, (value, key) => {
      const ticket = {ticketValue: value, ticketKey: key};
      switch (ticket.ticketValue.status) {
        case 'Pending':
          pendingTickets.push(ticket)
          break;
        case 'Started':
          startedTickets.push(ticket)
          break;
        case 'In Review':
          reviewingTickets.push(ticket)
          break;
        case 'Done':
          doneTickets.push(ticket)
          break;
        default:
          pendingTickets.push(ticket)
          break;
      }
    });

    return (
      <>
        <TicketColumn
          title='Pending'
          color='grey'
          tickets={pendingTickets}
        />
        <TicketColumn
          title='Started'
          color='grey'
          tickets={startedTickets}
        />
        <TicketColumn
          title='In Review'
          color='grey'
          tickets={reviewingTickets}
        />
        <TicketColumn
          title='Done'
          color='grey'
          tickets={doneTickets}
        />
      </>
    );

  }

  componentWillMount() {
    this.props.fetchToDos();
  }
  
  render() {
    const session = store.getState().session;
    const { addFormVisible } = this.state;
    return (
      <>
      { session.currentUser ?
        <div>
          <div className='ticket-container'>
            {this.renderToDos()}
          </div>
          {this.renderAddForm()}
          <div className='button-container fixed-action-btn margin-t-1'>
            <button
              onClick={() => this.setState({ addFormVisible: !addFormVisible })}
              className='button-main'
            >
              {addFormVisible ? 'close' : 'add'}
            </button>
          </div>
        </div>
        :
        <h1>
          Login to see tickets
        </h1>
      }
      </>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ToDoList);
