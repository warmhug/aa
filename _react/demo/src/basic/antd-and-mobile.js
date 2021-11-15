import React from 'react';

// import js and css modularly, parsed by babel-plugin-antd
import { Button } from 'antd-mobile';
// import pc antd
import { Button as ButtonPc } from 'antd';
// import 'antd/lib/button/style/index.css';
// import ButtonPc from 'antd/lib/button';

export default class Antd extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={(e) => console.log('mobile', e) }>Start</Button> <br />
        <ButtonPc onClick={(e) => console.log(e)}>Start</ButtonPc>
      </div>
    );
  }
}
