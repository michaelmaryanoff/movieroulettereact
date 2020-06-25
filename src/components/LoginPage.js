import React from 'react';
import LoginForm from './LoginForm';
import { withRouter } from 'react-router';

class LoginPage extends React.Component {
  render() {
    return <LoginForm />;
  }
}

export default withRouter(LoginPage);
