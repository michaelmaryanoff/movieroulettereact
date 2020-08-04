import React from 'react';

const TextInputField = props => {
  return (
    <div className="field">
      <div className="ui left icon input">
        <i className={`${props.icon} icon`} />
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.handleUserInput}
          value={props.value}
        />
      </div>
      {/* This is where we render the error */}
      <div>{props.children}</div>
    </div>
  );
};

export default TextInputField;
