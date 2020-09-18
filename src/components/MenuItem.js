import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const MenuItem = props => {
  let activeClass = props.pathName === props.route ? 'active' : '';
  if (props.pathName === '/' && props.label === 'SPIN') {
    activeClass = 'active';
  }

  return (
    <div>
      <Link to={props.route} className={`${activeClass} header item`}>
        {props.label}
      </Link>
    </div>
  );
};

export default withRouter(MenuItem);
