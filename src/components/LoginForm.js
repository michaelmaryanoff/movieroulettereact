import React from 'react';
import reelLogo from '../../src/images/reel-logo.png';

import { tempusername, temppassword } from '../testinfo/testinfo';

import { signIn, getWatchList, getUserDetails } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
import { hideLoading } from 'react-redux-loading-bar';
import LoadingBar from 'react-redux-loading-bar';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: tempusername,
      password: temppassword,
      hasSubmitted: false
    };
  }
  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/spin');
    }
  }

  renderFieldError = fieldName => {
    if (fieldName === 'username' && !this.state.username && this.state.hasSubmitted) {
      return <div className="ui error message">Please enter a username</div>;
    }

    if (fieldName === 'password' && !this.state.password && this.state.hasSubmitted) {
      return <div className="ui error message">Please enter a password</div>;
    }
  };

  renderLoginError = () => {
    if (this.props.authError) {
      this.props.hideLoading();
      return <div className="ui error message">Invalid username and/or password</div>;
    }
  };

  handleUserInput = event => {
    // You might want to try using an if statement here so we don't reset the state every time
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
    this.props.getUserDetails(params);
  };

  renderLoginForm() {
    return (
      <div className="two column row">
        <div className="column">
          <h2 className="ui teal image header">
            <img src={reelLogo} className="image" alt="logo" />
            <div className="content">Log in to your TMDB Account</div>
          </h2>
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
                <div>{this.renderFieldError('username')}</div>
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
                <div>{this.renderFieldError('password')}</div>
              </div>
              <button className="ui fluid large teal submit button">Login</button>
              <div>{this.renderLoginError()}</div>
              <div className="ui message">
                Don't have an account? {<Link to="/spin">Click here to continue as guest</Link>}
                <p />
                {<a href="https://www.themoviedb.org/account/signup">Click here to sign up</a>}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="pusher">
        <LoadingBar />
        <div className="ui basic segment"></div>
        <div className="ui basic segment"></div>
        <div className="ui middle aligned center aligned grid">{this.renderLoginForm()}</div>
      </div>
    );
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
  connect(mapStateToProps, { signIn, getWatchList, getUserDetails, hideLoading })(LoginForm)
);
