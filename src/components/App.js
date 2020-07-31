import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import WatchList from './WatchList';
import Menu from './Menu';
import SpinPage from './SpinPage';
import ErrorPage from './ErrorPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/" exact component={SpinPage} />
            <Route path="/spin" exact component={SpinPage} />
            <Route path="/watchlist" exact component={WatchList} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // This is here in case we need to access app state for debugging
    currentState: state
  };
};

export default connect(mapStateToProps, {})(App);
