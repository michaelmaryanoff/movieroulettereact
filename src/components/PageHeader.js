import React from 'react';

const PageHeader = ({ label }) => {
  return (
    <div className="ui sizer basic centered vertical segment">
      <div className="ui large teal center aligned header">{label}</div>
    </div>
  );
};

export default PageHeader;
