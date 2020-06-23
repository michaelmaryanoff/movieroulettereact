import React from 'react';
import reelLogo from '../../src/images/reel-logo.png';
import { signIn } from '../actions';
import { connect } from 'react-redux';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: '',
        password: ''
      },
      hasSubmitted: false
    };
  }

  renderError = fieldName => {
    if (fieldName === 'username' && !this.state.username && this.state.hasSubmitted) {
      return <div className="ui error message">Please enter a username</div>;
    }

    if (fieldName === 'password' && !this.state.password && this.state.hasSubmitted) {
      return <div className="ui error message">Please enter a password</div>;
    }
  };

  handleUserInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ userInfo: { [name]: value } });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ hasSubmitted: true });
    this.props.signIn(this.state.userInfo.username, this.state.userInfo.password);
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
                    value={this.state.userInfo.username || ''}
                    placeholder="Username"
                    onChange={event => this.handleUserInput(event)}
                  />
                </div>
                <div>{this.renderError('username')}</div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    value={this.state.userInfo.password || ''}
                    placeholder="Password"
                    onChange={event => this.handleUserInput(event)}
                  />
                </div>
                <div>{this.renderError('password')}</div>
              </div>

              <button className="ui fluid large teal submit button">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  render() {

    return <div className="ui middle aligned center aligned grid">{this.renderLoginForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    dummy: 0
  };
};

export default connect(mapStateToProps, { signIn })(LoginForm);
