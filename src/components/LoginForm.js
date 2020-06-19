import React from 'react';
import reelLogo from '../../src/images/reel-logo.png';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import InputField from './InputField';

class LoginForm extends React.Component {
  renderField = () => {
    return <div>email</div>;
  };

  renderLoginForm() {
    return (
      <div className="column">
        <h2 className="ui image header">
          <img src={reelLogo} className="image" alt="logo" />
          <div className="content">Log in to your TMDB Account</div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
            <Field
              name="login"
              className="field"
              component={component => <InputField fieldType="username" />}
            />
            <Field
              name="login"
              className="field"
              component={component => <InputField fieldType="password" />}
            />
            <button className="ui fuild large submit button">Login</button>
          </div>
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">{this.renderLoginForm()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

// export default connect(reduxForm(mapStateToProps, { form: 'loginForm' })(LoginForm));
const formWrapped = reduxForm({ form: 'loginForm' })(LoginForm);

export default connect(mapStateToProps)(withRouter(formWrapped));
