import React from 'react';

export default class Demo extends React.Component {
  componentDidMount() {
    this.props.changeTitle('Stage 1');
    window.addEventListener('beforeunload', this.beforeunload);
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
  }
  beforeunload = (event) => {
    event.preventDefault(); // for IE?
    event.returnValue = false; // for Chrome
    return '确定离开页面吗？';
  }
  render() {
    return (<div style={{ marginBottom: 30 }}>
      Page 1
    </div>);
  }
}
