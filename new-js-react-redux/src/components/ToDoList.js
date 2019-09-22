import "./ToDoList.css";
import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import TicketColumn from './TicketColumn';
import './ticketHomePage.css';

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: "",
    addFormDescription: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ addFormDescription: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue, addFormDescription } = this.state;
    const { addTicket } = this.props;
    event.preventDefault();
    addTicket({ title: addFormValue, status: 'Pending', description: addFormDescription });
    this.setState({ addFormValue: "" });
    this.setState({ addFormStatus: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue, addFormDescription } = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">Ticket Title: </i>
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="ticketTitle"
                type="text"
              /> <br/>
              <i className="material-icons prefix">Ticket Description</i><br/>
              <textarea
                value={addFormDescription}
                onChange={this.handleDescriptionChange}
                id="ticketDescription"
                type="textarea"
              /><br/>
              <input type="submit" value="Submit"></input>
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
    const { addFormVisible } = this.state;
    return (
      <div className="to-do-list-container">
        <div className='ticket-container'>
          {this.renderToDos()}
        </div>
        {this.renderAddForm()}
        <div className="fixed-action-btn">
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4"
          >
            {addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
              <i className="large material-icons">add</i>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ToDoList);