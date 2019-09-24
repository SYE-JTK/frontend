import React, { Component } from 'react';
import './page.css';

class Modal extends Component {

  render() {
    return (
      <header className='page-header'>
        { this.props.children }
      </header>
    );
  }
}

export default Modal;
