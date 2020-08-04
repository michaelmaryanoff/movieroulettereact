import React from 'react';


import { tempusername, temppassword } from '../testinfo/testinfo';

import { signIn, getWatchList } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
import { hideLoading } from 'react-redux-loading-bar';

import TextInputFieldError from './TextInputFieldError';
import LoginHeader from './LoginHeader';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // You will need to turn these into empty strings
    // pre-filled fields are for testing only.
    this.state = {
      username: '',
      password: '',
      hasSubmitted: false
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/spin');
    }
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/spin');
    }
  }

  renderLoginError = () => {
    if (this.props.authError) {
      if (this.props.authError.message === 'Network Error') {
        return <div className="ui error message">There was an error with your network</div>;
      }
      if (this.props.authError) {
        return <div className="ui error message">Invalid username and/or password</div>;
      }
    }
  };

  handleUserInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ hasSubmitted: true });
    if (!this.state.username || !this.state.password) {
      return;
    }

    let params = { username: this.state.username, password: this.state.password };

    this.props.signIn(params);
  };

  renderLoginForm() {
    return (
      <div className="ui basic segment">
      <LoginHeader />
        <form className="ui large form error" onSubmit={this.handleSubmit}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleUserInput}
                  value={this.state.username}
                />
              </div>
              <div>
                <TextInputFieldError
                  message="Please enter a username"
                  field={this.state.username}
                  hasSubmitted={this.state.hasSubmitted}
                />
              </div>
            </div>

            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleUserInput}
                  value={this.state.password}
                />
              </div>
              <div>
                <TextInputFieldError
                  message="Please enter a password"
                  field={this.state.password}
                  hasSubmitted={this.state.hasSubmitted}
                />
              </div>
            </div>
            <button className="ui fluid large teal submit button">Login</button>
            <div>{this.renderLoginError()}</div>
            <div style={{ textAlign: 'center' }} className="ui message">
              Don't have an account? {<Link to="/spin">Click here to continue as guest</Link>}
              <p />
              {<a href="https://www.themoviedb.org/account/signup">Click here to sign up</a>}
            </div>
          </div>
        </form>
      </div>
    );
  }
  render() {
    return <div className="ui middle aligned center aligned grid">{this.renderLoginForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn,
    authError: state.session.authError
  };
};

export default withRouter(
  connect(mapStateToProps, { signIn, getWatchList, hideLoading })(LoginForm)
);
