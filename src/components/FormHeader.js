import React from 'react';

const FormHeader = ({ label }) => {
  return (
    <h2 className="ui inverted image header">
      <div className="content">{label}</div>
    </h2>
  );
};

export default FormHeader;
