import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from 'components//Header';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

export default connect(mapStateToProps)(Header);
