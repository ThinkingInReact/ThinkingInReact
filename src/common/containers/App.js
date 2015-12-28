import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import cx from 'classnames';
import TOC from 'components//TOC';
import Header from 'components//reduxed/Header';
import Footer from 'components//Footer';
import MenuIcon from 'icons//Menu';
import { toggleMenu } from 'actions//menuopen';

class App extends Component {
  toggleMenu(e) {
    e.preventDefault();
    this.props.toggleMenu();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className={cx("Main", {'Main--MenuOpen': this.props.menuopen})} >
          {this.props.children}
          <Footer params={this.props.params} />
        </div>
        <div className="Sidebar">
          <div className={cx('Menu', {'Menu--MenuOpen': this.props.menuopen})}>
            <TOC />
          </div>
          <a href="#" className="ToggleMenu" onClick={this.toggleMenu.bind(this)}>
            <MenuIcon />
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    toc: state.toc,
    menuopen: state.menuopen
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleMenu}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
