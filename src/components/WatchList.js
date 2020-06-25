import React from 'react';
import { withRouter } from 'react-router';

class WatchList extends React.Component {
  componentDidMount() {
    console.log('mount');
  }
  render() {
    return <div>WatchList</div>;
  }
}

export default withRouter(WatchList);
