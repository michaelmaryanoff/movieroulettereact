import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import SpinPage from './SpinPage';
import WatchList from './WatchList';
import history from '../history';

class App extends React.Component {
  render() {
    console.log('props in App', this.props);

    return (
      <div className="ui container">
        <Router history={history}>
          <Switch>
            <ProtectedRoute path="/spin" component={SpinPage} isLoggedIn={this.props.isLoggedIn} />
            <ProtectedRoute
              path="/watchlist"
              component={WatchList}
              isLoggedIn={this.props.isLoggedIn}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
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
