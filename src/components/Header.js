import React from 'react';

const Header = props => {
  return (
    <div className="ui secondary pointing menu">
      <div className="ui container">{props.children}</div>
    </div>
  );
};

export default Header;
