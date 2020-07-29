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

  renderBlankHeader() {
    return <div></div>;
  }

  renderHeader() {
    if (this.props.isLoggedIn) {
      return (
        <div className="ui secondary pointing menu">
          <div className="ui container">
            <div>
              <Link to="/watchlist" className="header item">
                WATCHLIST
              </Link>
            </div>
            <div>
              <Link to="/spin" className="header item">
                SPIN
              </Link>
            </div>
            <div className="right menu">
              <button className="ui button item" onClick={this.handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui secondary pointing menu">
          <div className="ui container">
            <div>
              <Link to="/login" className="header item">
                LOG IN TO SEE WATCHLIST
              </Link>
            </div>
            <div>
              <Link to="/spin" className="header item">
                SPIN
              </Link>
            </div>
            <div className="right menu">
              <Link to="/login" className="header item">
                LOG IN
              </Link>
            </div>
          </div>
        </div>
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
export default withRouter(connect(mapStateToProps, { signOut })(Header));
