import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Login
      </Link>
      <div className="right menu">
        <Link to="/watchlist" className="item">
          Watchlist
        </Link>
      </div>
    </div>
  );
};

export default Header;
