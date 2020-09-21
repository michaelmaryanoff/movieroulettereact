import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const GuestWatchlistAddButton = () => {
  return (
    <Fragment>
      <Link style={{ color: 'white' }} to="/login">
        <button className="ui fluid red basic button" style={{ textEmphasisColor: 'white' }}>
          <Link style={{ color: 'white' }} to="/login">
            Log in to add to Watchlist
          </Link>
        </button>
      </Link>
    </Fragment>
  );
};

export default GuestWatchlistAddButton;
