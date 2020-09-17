import React from 'react';

const PageHeader = ({ label }) => {
  return (
    <div className="ui sizer basic centered vertical segment">
      <div className="ui large center aligned inverted header">{label}</div>
    </div>
  );
};

export default PageHeader;
