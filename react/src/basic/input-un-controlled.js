import React from 'react';

export default class ControlledInput extends React.Component {
  state = {
    value: 1
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.value);
  }

  onChange = (e) => {
    this.setState({ value: Math.random() });
  }
  
  render() {
    return (
      <div>
        <h3>Uncontrolled input</h3>
        <input type="checkbox" defaultChecked={false} value="on" />
        <input defaultValue={this.state.value} onChange={e => console.log(e.target.value)} /> <br />
        defaultValue 不能被改变为其他值：<input defaultValue={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
