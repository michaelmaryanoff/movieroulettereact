import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutHeader = () => {
  return (
    <Fragment>
      <div>
        <Link to={'/login'} className="header item">
          LOG IN TO SEE WATCHLIST
        </Link>
      </div>
      <div>
        <Link to="/spin" className="header item">
          SPIN_
        </Link>
      </div>
      <div className="right menu">
        <Link to="/login" className="header item">
          LOG IN
        </Link>
      </div>
    </Fragment>
  );
};

export default LoggedOutHeader;
