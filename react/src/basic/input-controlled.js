import React from 'react';
// think react input two-way-binding.

export default class ControlledInput extends React.Component {
  state = {
    val: 1
  };

  componentWillReceiveProps(nextProps) {
    // this.setState({ val: nextProps.val });
  }
  
  render() {
    return (
      <div>
        <h3>controlled input</h3>
        <input value={this.state.val}/> <br/>
      </div>
    );
  }
}
