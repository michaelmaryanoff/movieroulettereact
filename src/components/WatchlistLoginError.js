import React from 'react';
import { Link } from 'react-router-dom';

export const WatchlistLoginError = () => {
  return (
    <div className="ui center aligned basic segment">
      <h3>
        You must be logged in to access this page.
        <p />
        <Link to="/login">Log in here</Link>
        <p />
        <Link to="/spin">Or continue as guest</Link>
      </h3>
    </div>
  );
};
