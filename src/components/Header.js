import React from 'react';

const Header = props => {
  // This is just a general container for our header menu. See the Menu component
  // For how this will actually be displayed.
  return (
    <div className="ui secondary pointing menu">
      <div className="ui container">{props.children}</div>
    </div>
  );
};

export default Header;
