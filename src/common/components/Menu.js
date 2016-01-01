import React, { Component } from 'react';
import GithubIcon from 'icons//Github';

class Menu extends Component {
  renderLoginOrLogout() {
    if(this.props.isLoggedIn) {
      return (
        <a href="https://www.ThinkingInReact.xyz/logout" className="Logout">Logout</a>
      );
    } else {
      return (
        <a href="https://www.ThinkingInReact.xyz/#login" className="Login">Login</a>
      );
    }
  }

  render() {
    return (
      <nav>
        <a href="https://read.ThinkingInReact.xyz/downloads/pdf" title="Download PDF">
          Download PDF
        </a>
        <a href="https://read.ThinkingInReact.xyz/downloads/epub" title="Download EPUB">
          Download EPUB
        </a>
        <a href="https://read.ThinkingInReact.xyz/downloads/mobi" title="Download Mobi">
          Download Mobi
        </a>

        <a href="mailto:k@2052.me">Contact Author</a>

        {this.renderLoginOrLogout()}
      </nav>
    )
  }
}


export default Menu;
