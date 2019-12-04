import './ToDoList.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';
import TicketColumn from './TicketColumn';
import './ticketHomePage.css';
import '../page_layout/page.css';
import store from '../../store';

import emailjs from 'emailjs-com';

class TicketPage extends Component {
  state = {
    addFormVisible: false,
    addFormValue: "",
    addFormDescription: "",
    addFormOwner: "",
    addFormOwnerEmail: ""
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

  handleOwnerEmailChange = event => {
    this.setState({ addFormOwnerEmail: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue, addFormDescription, addFormOwner, addFormOwnerEmail } = this.state;
    const { addTicket } = this.props;
    event.preventDefault();

    addTicket({ 
      title: addFormValue, status: 'Pending', 
      description: addFormDescription, 
      owner: addFormOwner, 
      owner_email: addFormOwnerEmail
    });
    this.setState({ addFormValue: "" });
    this.setState({ addFormStatus: "" });
    this.setState({ addFormOwner: "" });
    if (addFormOwnerEmail) {
      emailjs.sendForm('default_service', 'template_uhnkcDia', event.target, 'user_zXK507imVLccNNarRQTGN')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }
    this.setState({ addFormOwnerEmail: "" });
  };

  sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('default_service', 'template_uhnkcDia', e.target, 'user_zXK507imVLccNNarRQTGN')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  renderAddForm = () => {
    const { addFormVisible, addFormValue, addFormDescription, addFormOwner, addFormOwnerEmail } = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field display-fc-c">
              <div className='display-f-c margin-b-1'>
                <input
                  name='ticket_title'
                  className='input-main margin-r-1'
                  value={addFormValue}
                  onChange={this.handleInputChange}
                  placeholder='enter ticket title'
                  id="ticketTitle"
                  type="text"
                /> <br/>
                <input
                  name='to_name'
                  className='input-main margin-x-1'
                  value={addFormOwner}
                  onChange={this.handleOwnerChange}
                  placeholder='enter ticket owner'
                  id="ticketOwner"
                  type="text"
                /> <br/>
                <select
                  name='user_email'
                  className='select-main margin-l-1'
                  value={addFormOwnerEmail}
                  onChange={this.handleOwnerEmailChange}
                  id="ticketOwnerEmail"
                >
                  <option selected value="">-- none --</option>
                  <option value="twjone16@stlawu.edu">twjone16@stlawu.edu</option>
                  <option value="knmurp16@stlawu.edu">knmurp16@stlawu.edu</option>
                  <option value="jbpeek16@stlawu.edu">jbpeek16@stlawu.edu</option>
                </select>
              </div>
              <textarea
                name='message_html'
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
      <div className='main-content'>
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
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(TicketPage);
