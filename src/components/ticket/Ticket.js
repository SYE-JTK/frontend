import React, { Component } from 'react';
import './ticketHomePage.css';
import '../page_layout/page.css';

import { connect } from "react-redux";
import { completeToDo, updateTicket } from "../../actions";
import Modal from '../page_layout/Modal';


class Ticket extends Component {

  state = {
    isEditOpen: false,
    isExpanded: false,
  };

  handleCompleteClick = (ticketId, currentStatus) => {
    const { completeToDo, updateTicket } = this.props;
    switch(currentStatus) {
      case 'Pending':
        updateTicket(ticketId, 'Started');
        break;
      case 'Started':
        updateTicket(ticketId, 'In Review');
        break;
      case 'In Review':
        updateTicket(ticketId, 'Done');
        break;
      default:
        completeToDo(ticketId);
        break;
    }
  };

  handleRestartTicket = (ticketId) => {
    // eslint-disable-next-line
    const { completeToDo, updateTicket } = this.props;
    
    updateTicket(ticketId, 'Pending');
  };

  handleDeleteTicket = (ticketId) => {
    const { completeToDo } = this.props;
    completeToDo(ticketId);
  };

  handleClick = () => {
    const { isEditOpen } = this.state;
    this.setState({ isEditOpen: !isEditOpen })
  }

  expandToggle = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded })
  }

  classes = (status) => {
    return status === 'Done' ? 'color-bg-success' : 
    status === 'Pending' ? 'color-bg-pending' : 'color-bg-main';
  };

  noStatus = () => {
    const { status } = this.state;
    return status === '' ? 'button-close' : 'button-main';
  }

  button = (status) => {
    switch(status){
      case 'Pending':
        return 'Start';
      case 'Started':
        return 'Review Submitted';
      case 'In Review':
        return 'Done';
      default:
        return 'Delete';
    }
  };

  nextButton = (ticketId, currentStatus) => {
    if(currentStatus !== 'Done') {
      return (
        <div className='button-container margin-t-1 margin-b-1'>
          <button
            className='button-main width-100'
            onClick={() => this.handleCompleteClick(ticketId, currentStatus)}
          >
            { this.button(currentStatus) }
          </button>
        </div>
      )
    }
  }

  render() {
    const { ticketId, title, description, owner, status } = this.props;
    const { isEditOpen, isExpanded } = this.state;
    return (
      <div className={`single-ticket-container ${this.classes(status)}`}>
        <div className='ticket-text-container'>
          { !isExpanded && 
            <>
            <div className='ticket-text-spacer'>Title: { title }</div>
            {this.nextButton(ticketId, status)}
            </>
          }
          { isExpanded ?
            <>
              <div className='ticket-text-spacer ticket-text-header'>Title</div>
              <div className='ticket-text-spacer'>{ title }</div>
              <div className='ticket-text-spacer ticket-text-header'>Description</div>
              {description ? <div className='ticket-text-spacer'>{ description }</div> : null}
              {owner? <div className='ticket-text-spacer ticket-text-header'>Owner</div> : null}
              <div className='ticket-text-spacer'>{ owner }</div>
              { isEditOpen &&
                <Modal>
                  <div>Text is here</div>
                </Modal>
              }
              <div className='button-container margin-t-1'>
                <button className='button-close width-100' onClick={() => this.expandToggle()}>
                  collapse
                </button>
              </div>
              <div className='button-container margin-t-1'>
                <button className='button-main width-100' onClick={() => this.handleClick()}>
                  edit
                </button>
              </div>
              <div className='button-container margin-t-1'>
                <button
                  className='button-close width-100'
                  onClick={() => this.handleDeleteTicket(ticketId, status)}
                >
                  delete ticket
                </button>
              </div>
              { this.nextButton(ticketId, status) }
            </>
            :
            <>
            { status !== 'Done' ?
              <div className='button-container'>
                <button className='button-main' onClick={() => this.expandToggle()}>
                  expand
                </button>
              </div>
              :
              <div className='ticket-text-spacer'>
                { owner }
              </div>
            }
            </>
          }
          {/* {
            !isExpanded && status === 'Done' &&
            <div className='button-container margin-t-1 margin-r-1'>
              <button
                className='button-close'
                onClick={() => this.handleDeleteTicket(ticketId, status)}
              >
                delete
              </button>
            </div>
          } */}
        </div>
      </div>
    );
  }
}

export default connect(null, { completeToDo, updateTicket })(Ticket);
