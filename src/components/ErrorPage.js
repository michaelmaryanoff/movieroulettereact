import React from 'react';
import ErrorImage404 from '../images/ErrorImage404.jpg';

class ErrorPage extends React.Component {
  render() {
    return (
      <div>
        <img className="ui fluid image" src={ErrorImage404} alt="Page not found" />
      </div>
    );
  }
}

export default ErrorPage;
