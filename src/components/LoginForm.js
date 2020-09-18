import React from 'react';

import { signIn, getWatchList, clearAuthError } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { hideLoading } from 'react-redux-loading-bar';

import TextInputFieldError from './TextInputFieldError';
import LoginHeader from './LoginHeader';
import TextInputField from './TextInputField';
import LoginError from './LoginError';
import LoginFormFooter from './LoginFormFooter';
import PageDescription from './PageDescription';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // You will need to turn these into empty strings (if they aren't already):
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

    this.props.clearAuthError();
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/spin');
    }
  }

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

  renderLoginForm() {
    const createDescriptionText = () => {
      return <div>If you would like to save a movie to watch later, you can sign in with a TMDb account and save it to your watchlist. TMDb is a movie database that comprises the backbone of Movie Roulette. <a href="https://www.themoviedb.org">Learn more here!</a></div>
    };

    return (
      <div className="seven wide column">
        <div className="ui basic inverted left aligned segment">
          <LoginHeader />
          <PageDescription content={createDescriptionText()} />
          <form className="ui large form error" onSubmit={this.handleSubmit}>
            <div className="ui inverted blue segment">
              <div className="ui stacked inverted segment">
                <TextInputField
                  name="username"
                  type="text"
                  placeholder="Username"
                  icon="user"
                  handleUserInput={this.handleUserInput}
                  value={this.state.username}
                >
                  <TextInputFieldError
                    message="Please enter a username"
                    field={this.state.username}
                    hasSubmitted={this.state.hasSubmitted}
                  />
                </TextInputField>

                <TextInputField
                  name="password"
                  placeholder="Password"
                  type="password"
                  handleUserInput={this.handleUserInput}
                  value={this.state.password}
                  icon="lock"
                >
                  <TextInputFieldError
                    message="Please enter a password"
                    field={this.state.password}
                    hasSubmitted={this.state.hasSubmitted}
                  />
                </TextInputField>
                <button className="ui fluid large red submit button">Login</button>
                <LoginError authError={this.props.authError} />
                <LoginFormFooter />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="ui middle aligned five column center aligned stackable grid">
        {this.renderLoginForm()}
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
  connect(mapStateToProps, { signIn, getWatchList, hideLoading, clearAuthError })(LoginForm)
);
