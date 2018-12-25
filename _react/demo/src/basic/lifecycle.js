import React from 'react';
import ReactDOM from 'react-dom'

class MyComponent extends React.Component {
  static defaultProps = {
    prefixCls: 'cls',
  };

  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {n: 0};
    this.increment.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.increment();
    this.increment();
    this.increment();
  }
  // increment() {
  //   this.setState({n: this.state.n + 1}, () => {console.log(this.state.n)});
  // }
  increment() {
    this.setState((prevState) => {return {n: prevState.n + 1}}, () => {console.log(this.state.n)});
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    console.log('render');
    // return null;
    return <h1>{this.state.n}</h1>;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('example'));
ReactDOM.unmountComponentAtNode(document.getElementById('example'));
ReactDOM.render(<MyComponent />, document.getElementById('example'));
ReactDOM.render(<MyComponent />, document.getElementById('example'));
