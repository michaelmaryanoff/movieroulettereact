import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dropdown extends Component {
  render() {
    console.log('props', this.props.name);

    return <div>Dropdown</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
