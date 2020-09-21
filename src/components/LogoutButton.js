import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { signOut } from '../actions';

const LogoutButton = props => {
  const handleLogout = () => {
    props.signOut();
  };

  return (
    <button className="ui button item" onClick={handleLogout}>
      LOGOUT
    </button>
  );
};

export default withRouter(connect(null, { signOut })(LogoutButton));
