import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

import MenuItem from './MenuItem';
import LogoutButton from './LogoutButton';

const MenuContainer = props => {
  // This label is redundant on the login page, so we will not render it if we are on the login page
  const loginToSeeWatclistLabel =
    props.location.pathname === '/login' ? null : (
      <MenuItem route="/login" label="LOG IN TO SEE WATCHLIST" pathName={props.location.pathname} />
    );

  const loggedInHeader = (
    <Fragment>
      <MenuItem route="/spin" label="SPIN" pathName={props.location.pathname} />
      <MenuItem route="/watchlist" label="WATCHLIST" pathName={props.location.pathname} />
      <div className="right menu">
        <LogoutButton />
      </div>
    </Fragment>
  );

  const loggedOutHeader = (
    <Fragment>
      <MenuItem route="/spin" label="SPIN" pathName={props.location.pathname} />
      {loginToSeeWatclistLabel}
      <div className="right menu">
        <MenuItem route="/login" label="LOG IN" pathName={props.location.pathname} />
      </div>
    </Fragment>
  );

  return props.isLoggedIn ? loggedInHeader : loggedOutHeader;
};

export default withRouter(MenuContainer);
