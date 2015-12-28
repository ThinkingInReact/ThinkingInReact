import React, { Component } from 'react';
import Menu from './Menu';

class Header extends Component {
  render() {
    return (
      <header>
        <Menu isLoggedIn={this.props.isLoggedIn} />
      </header>
    );
  }
}

export default Header;
