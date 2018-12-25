import React from 'react';

export default class ControlledInput extends React.Component {
  state = {
    val: 1
  };

  componentWillReceiveProps(nextProps) {
    // this.setState({ val: nextProps.val });
  }
  
  render() {
    return (<div>
      <input value={this.state.val}/> <br/>
    </div>);
  }
}
