import React, { Component } from 'react';
import './page.css';

class Header extends Component {

  render() {
    const { text } = this.props;
    return (
      <header className='page-header'>
        <div className='page-header-text'>{ text }</div>
        { this.props.children }
      </header>
    );
  }
}

export default Header;
