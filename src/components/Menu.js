import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { signOut } from '../actions';
import Header from './Header';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { headerShouldRender: true };
  }

  renderBlankHeader() {
    return <div></div>;
  }

  renderHeader() {
    if (this.props.isLoggedIn) {
      return (
        <Header>
          <LoggedInHeader />
        </Header>
      );
    } else {
      return (
        <Header>
          <LoggedOutHeader />
        </Header>
      );
    }
  }

  render() {
    return (
      <div>
        {this.props.location.pathname === '/login' || this.props.location.pathname === '/'
          ? this.renderBlankHeader()
          : this.renderHeader()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn
  };
};

// get our props into our header
export default withRouter(connect(mapStateToProps, { signOut })(Menu));
