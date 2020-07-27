import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { signOut } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { headerShouldRender: true };
  }

  handleLogout = () => {
    this.props.signOut().then(this.props.history.push('/login'));
  };

  renderHeader() {
    if (this.props.isLoggedIn) {
      return (
        <div className="ui stackable menu">
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
            <button className="ui button item" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui stackable menu">
          <div>
            <Link to="/spin" className="header item">
              Spin
            </Link>
          </div>
          <div>
            <Link to="/login" className="header item">
              Log in to see Watchlist
            </Link>
          </div>

          <div className="right menu">
            <Link to="/login" className="header item">
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
    isLoggedIn: state.session.isLoggedIn
  };
};

// get our props into our header
export default withRouter(connect(mapStateToProps, { signOut })(Header));
