import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import Watchlist from './Watchlist';
import Menu from './Menu';
import SpinPage from './SpinPage';
import ErrorPage from './ErrorPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Menu />
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/login'} exact component={LoginPage} />
            <Route path={process.env.PUBLIC_URL + '/login'} exact component={LoginPage} />
            <Route path={process.env.PUBLIC_URL + '/'} exact component={SpinPage} />
            <Route path={process.env.PUBLIC_URL + '/spin'} exact component={SpinPage} />
            <Route path={process.env.PUBLIC_URL + '/watchlist'} exact component={Watchlist} />
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
