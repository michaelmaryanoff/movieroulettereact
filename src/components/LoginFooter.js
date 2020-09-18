import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div style={{ textAlign: 'center' }} className="ui blue message">
      Don't have an account? {<Link to="/spin">Click here to continue as guest</Link>}
      <p />
      {<a href="https://www.themoviedb.org/account/signup">Click here to sign up</a>}
    </div>
  );
};

export default LoginFooter;
