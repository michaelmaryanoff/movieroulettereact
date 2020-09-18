import React from 'react';

import { Link } from 'react-router-dom';

const GuestWatchlistAddButton = () => {
  return (
    <button className="ui fluid red basic button">
      <Link style={{ color: 'white' }} to="login">
        Log in to add to Watchlist
      </Link>
    </button>
  );
};

export default GuestWatchlistAddButton;
