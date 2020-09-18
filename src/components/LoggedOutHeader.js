import React, { Fragment } from 'react';

import { withRouter } from 'react-router';

import MenuItem from './MenuItem';

const LoggedOutHeader = props => {
  return (
    <Fragment>
      <MenuItem route="/login" label="LOG IN TO SEE WATCHLIST" pathName={props.location.pathname} />
      <MenuItem route="/spin" label="SPIN" pathName={props.location.pathname} />
      <div className="right menu">
        <MenuItem route="/login" label="LOG IN" pathName={props.location.pathname} />
      </div>
    </Fragment>
  );
};

export default withRouter(LoggedOutHeader);
