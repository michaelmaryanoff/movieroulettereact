import React from 'react';
import reelLogo from '../../src/images/reel-logo.png';

const LoginHeader = () => {
  return (
    <h2 className="ui teal image header">
      <img src={reelLogo} className="image" alt="logo" />
      <div className="content">Log in to your TMDB Account</div>
    </h2>
  );
};

export default LoginHeader;
