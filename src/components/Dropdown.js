import React, { Component } from 'react';
import { Dropdown as SemanticDropdown, Select } from 'semantic-ui-react';

class Dropdown extends Component {
  handleUserInput = event => {
    console.log('user input');

    // These arguments are passed to the parent form in order to create a controlled component

    // This is going to give us more useful information than event.value
    // e.g. the genre code instead of the genre name
    const { rawvalue } = event.target.selectedOptions[0].dataset;

    // This is going to give us the actual data from the selected itself.
    const { value } = event.target;

    this.props.onChange(value, rawvalue);
  };

  createOptionData = () => {
    const data = this.props.optiondata.map(option => {
      const { id, value } = option;
      return (
        <option data-rawvalue={id} name={value} key={id} value={value} label={value}>
          {value}
        </option>
      );
    });
    return data;
  };

  // render() {
  //   return (
  //     <div className="field">
  //       <label>{this.props.labeltext}</label>
  //       <select
  //         name={this.props.inputtype}
  //         className="ui simple dropdown"
  //         value={this.props.value}
  //         onChange={this.handleUserInput}
  //       >
  //         {this.props.children}
  //       </select>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.labeltext}</label>
        <Select
          name={this.props.inputtype}
          onChange={this.handleUserInput}
          options={this.createOptionData()}
          selection
          labeled={true}
        />
      </div>
    );
  }
}

export default Dropdown;
