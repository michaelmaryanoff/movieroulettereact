import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import ProtectedRoute from './ProtectedRoute';
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
            <Route path="/spin" component={SpinPage} />
            <Route path="/watchlist" component={WatchList} />
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
    currentState: state
  };
};

export default connect(mapStateToProps, {})(App);
