import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { destroyGuestSession } from '../actions';

class Header extends React.Component {
  handleLogout() {
    console.log('logout clicked');
  }
  renderHeader() {
    if (this.props.isLoggedIn) {
      //TODO: We need to add functionality to logout
      return (
        <div className="ui menu">
          <div>
            <Link to="/watchlist" className="header item">
              Watchlist
            </Link>
          </div>
          <div>
            <Link to="/spin" className="header item">
              Spin
            </Link>
          </div>
          <div className="right menu">
            <div className="item">Welcome, {this.props.sessionDetails.accountDetails.name}!</div>
            <Link className="header item" onClick={this.handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      );
    } else if (this.props.isGuestSession) {
      return (
        <div className="ui menu">
          <div>
            <Link to="/spin" className="header item">
              Spin
            </Link>
          </div>
          <div>
            <Link to="/login" className="header item" onClick={this.props.destroyGuestSession}>
              Log in to see Watchlist
            </Link>
          </div>

          <div className="right menu">
            <Link to="/login" className="header item" onClick={this.props.destroyGuestSession}>
              Log in
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderHeader()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn,
    isGuestSession: state.session.isGuestSession
  };
};

// get our props into our header
export default connect(mapStateToProps, { destroyGuestSession })(Header);
