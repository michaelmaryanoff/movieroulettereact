import React from 'react';
import reelLogo from '../../src/images/reel-logo.png';

class LoginForm extends React.Component {
  renderField = () => {
    return <div>email</div>;
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log('change');
  }

  renderLoginForm() {
    return (
      <div className="two column row">
        <div className="column">
          <h2 className="ui teal image header">
            <img src={reelLogo} className="image" alt="logo" />
            <div className="content">Log in to your TMDB Account</div>
          </h2>
          <form className="ui large form" onSubmit={this.handleSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input type="text" name="login" placeholder="Username" />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input type="text" name="login" placeholder="Password" />
                </div>
              </div>
              <button className="ui fuild large teal submit button">Login</button>
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

// export default connect(reduxForm(mapStateToProps, { form: 'loginForm' })(LoginForm));
export default LoginForm;
