import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingBar from 'react-redux-loading-bar';
import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="pusher">
          <LoadingBar />
          <div className="ui basic segment"></div>
          <div className="ui basic segment"></div>
          <LoginForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentState: state
  };
};

export default connect(mapStateToProps)(LoginPage);
