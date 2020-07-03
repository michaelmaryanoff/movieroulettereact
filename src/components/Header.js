import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { destroyGuestSession, signOut } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { headerShouldRender: false };
  }

  componentDidMount() {
    if (this.props.isLoggedIn || this.props.isGuestSession) {
      this.setState({ headerShouldRender: true });
    }
  }

  handleLogout = () => {
    this.setState({ headerShouldRender: false });
    this.props.signOut().then(this.props.history.push('/login'));
  };

  renderHeader() {
    if (this.state.headerShouldRender && this.props.isLoggedIn) {
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
            <button className="header inactive item" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
      );
    }
    if (this.props.isGuestSession && this.state.headerShouldRender) {
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
export default withRouter(connect(mapStateToProps, { destroyGuestSession, signOut })(Header));
