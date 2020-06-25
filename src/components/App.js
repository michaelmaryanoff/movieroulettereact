import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import WatchList from './WatchList';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Fragment>
            <div>
              <Switch>
                <Route path="/watchlist" exact component={WatchList} />
                {/* <Route path="/login" exact component={LoginForm} /> */}
                <Route path="/" exact component={LoginForm} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

export default connect(mapStateToProps, {})(App);
