import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { signOut } from '../actions';
import Header from './Header';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';

class Menu extends React.Component {
  renderHeader() {
    // Header will render conditional depending on user's auth status
    return <Header>{this.props.isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}</Header>;
  }

  render() {
    // We are not going to render our header on the login page, hence the logic check.
    return <div>{this.props.location.pathname === '/login' ? null : this.renderHeader()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

// get our props into our header
export default withRouter(connect(mapStateToProps, { signOut })(Menu));
