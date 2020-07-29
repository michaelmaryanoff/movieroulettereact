import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { signOut } from '../actions';

class LoggedInHeader extends React.Component {
  handleLogout = () => {
    this.props.signOut().then(this.props.history.push('/login'));
  };
  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, { signOut })(LoggedInHeader));
