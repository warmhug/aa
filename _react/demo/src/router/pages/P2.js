import React from 'react';

export default class Demo extends React.Component {
  componentDidMount() {
    this.props.changeTitle('Stage 2');
  }
  componentWillUnmount() {
    // invoked immediately before a component is unmounted.
    console.log('componentWillUnmount');
  }
  render() {
    return (<div style={{ marginBottom: 30 }}>
      Page 2
    </div>);
  }
}
