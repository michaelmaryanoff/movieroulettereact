import React from 'react';

class LoginForm extends React.Component {
    renderLoginForm() {
        return (
            <div className="column">
                <h2 className="ui blue image header">
                    <div className="content">
                        Log in to your TMDB Account
                    </div>
                </h2>
            </div>
        )
    }
  render() {
    return <div>LoginForm</div>;
  }
}

export default LoginForm;
