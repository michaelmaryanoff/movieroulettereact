import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { destroyGuestSession, signOut } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { headerShouldRender: true };
  }

  componentDidMount() {
    if (this.props.history.location.pathname === ('/' || '/login')) {
      console.log('his', this.props.history.location.pathname);
      console.log('loc', this.props.history.location);

      this.setState({ headerShouldRender: false });
    } else {
      this.setState({ headerShouldRender: true });
    }

    if (this.props.isLoggedIn) {
      this.setState({ headerShouldRender: true });
    }
  }

  componentDidUpdate() {}

  handleLogout = () => {
    console.log('handle logout');

    this.setState({ headerShouldRender: false });
    this.props.signOut().then(this.props.history.push('/login'));
  };

  renderHeader() {
    if (this.state.headerShouldRender === false) {
      return <div></div>;
    }
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
            <button className="header item" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
      );
    }
    if (!this.props.isLoggedIn && this.state.headerShouldRender === true) {
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
    console.log('this.state.headerShouldRender', this.state.headerShouldRender);
    console.log('render', this.props.history.location.pathname);
    if (this.props.history.location.pathname) {
    }

    return <div>{this.renderHeader()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn
  };
};

// get our props into our header
export default withRouter(connect(mapStateToProps, { destroyGuestSession, signOut })(Header));
