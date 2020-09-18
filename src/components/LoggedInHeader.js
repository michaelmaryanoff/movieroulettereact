import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

import MenuItem from './MenuItem';
import LogoutButton from './LogoutButton';

const LoggedInHeader = props => {
  return (
    <Fragment>
      <MenuItem route="/watchlist" label="WATCHLIST" pathName={props.location.pathname} />
      <MenuItem route="/spin" label="SPIN" pathName={props.location.pathname} />
      <div className="right menu">
        <LogoutButton />
      </div>
    </Fragment>
  );
};

export default withRouter(LoggedInHeader);
