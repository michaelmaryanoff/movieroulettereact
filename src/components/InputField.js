import React from 'react';

const InputField = props => {
  let customInput;
  let icon;
  if (props.fieldType === 'username') {
    customInput = <input type="text" name="username" placeholder="username"></input>;
    icon = 'user';
  }

  if (props.fieldType === 'password') {
    customInput = <input type="text" name="password" placeholder="password"></input>;
    icon = 'lock';
  }

  const fieldWrapper = (
    <div className="ui left icon input">
      <i className={`${icon} icon`}></i>
      {customInput}
    </div>
  );

  return <div>{fieldWrapper}</div>;
};

export default InputField;
