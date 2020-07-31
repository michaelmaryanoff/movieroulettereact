import React from 'react';
import ErrorImage404 from '../images/ErrorImage404.jpg';

const ErrorPage = () => {
  return (
    <div>
      <img className="ui fluid image" src={ErrorImage404} alt="Page not found" />
    </div>
  );
};

export default ErrorPage;
