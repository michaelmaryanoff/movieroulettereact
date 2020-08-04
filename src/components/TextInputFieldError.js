import React from 'react';

const TextInputFieldError = props => {
  return !props.field && props.hasSubmitted ? (
    <div className="ui error message">{props.message}</div>
  ) : null;
};

export default TextInputFieldError;
