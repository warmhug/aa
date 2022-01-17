import React from 'react';
import ReactDOM from 'react-dom';

import Antd from './antd-and-mobile';
import ControlledInput from './input-controlled';
import UnControlledInput from './input-un-controlled';
import Misc from './misc';

class App extends React.Component {
  render() {
    return (
      <div>
        <Antd />
        <ControlledInput />
        <UnControlledInput />
        <Misc />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('example'));
