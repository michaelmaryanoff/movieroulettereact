import React from 'react';

class SpinPage extends React.Component {
  generateYearArray() {
    let currentYear = new Date().getFullYear();
    let firstYear = 1920;
    let years = [];

    for (let i = firstYear; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  }

  renderSpinForm() {
    return <div>Spin Form</div>;
  }

  render() {
    return <div>{this.renderSpinForm()}</div>;
  }
}

export default SpinPage;
