import React from 'react';

const LoginError = props => {
  if (props.authError) {
    return (
      <div className="ui error message">
        {props.authError.message === 'Network Error'
          ? 'There was an error with your network'
          : 'Invalid username and/or password'}
      </div>
    );
  } else {
    return null;
  }
};

export default LoginError;
