import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import SpinPage from './SpinPage';
import WatchList from './WatchList';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/spin" component={SpinPage} />
            <Route path="/watchlist" component={WatchList} />
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
