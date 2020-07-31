import React, { Component } from 'react';

class DropdownOptions extends Component {
  render() {
    return this.props.optiondata.map(option => {
      const { id, value } = option;
      return <option data-rawvalue={id} key={id} value={value} label={value} />;
    });
  }
}

export default DropdownOptions;
