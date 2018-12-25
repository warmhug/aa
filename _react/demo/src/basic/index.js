import React from 'react';
import ReactDOM from 'react-dom';

// import js and css modularly, parsed by babel-plugin-antd
import { Button } from 'antd-mobile';

// import pc antd
import { Button as ButtonPc } from 'antd';
// import 'antd/lib/button/style/index.css';
// import ButtonPc from 'antd/lib/button';

import ControlledInput from './controlled-input';
// require('./index.less');
// think react input two-way-binding.

class App extends React.Component {
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
    return (<div>
      <Button onClick={(e) =>  console.log('mobile', e) }>Start</Button> <br />
      <ButtonPc onClick={(e) => console.log(e)}>Start</ButtonPc>
      
      <h3>Uncontrolled input</h3>
      <input type="checkbox" defaultChecked={false} value="on" />
      <input defaultValue={this.state.value} onChange={e => console.log(e.target.value)} /> <br />
      defaultValue 不能被改变为其他值：<input defaultValue={this.state.value} onChange={this.onChange} />
      
      <h3>controlled input</h3>
      <ControlledInput />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('example'));
