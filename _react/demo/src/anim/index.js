import React from 'react';
import ReactDOM from 'react-dom';

import ScrollAnim from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';

import './index.less';

const ScrollOverPack = ScrollAnim.OverPack;

class App extends React.Component {
  state = {
    slideIndex: 1,
  }
  componentDidUpdate() {
    
  }
  render() {
    return (<div>
      <div className="p1">
        <QueueAnim key="1" type="bottom">
          <div key="0" className="demo"></div>
          <div key="1" className="demo" style={{ backgroundColor: '#F38EAD' }}></div>
          <div key="2" className="demo"></div>
          <div key="3" className="demo"></div>
        </QueueAnim>
      </div>
      <ScrollOverPack
        className="pack-page page3"
        style={{ backgroundColor: '#174270' }}
        playScale={0.8}
        id="page3"
      >
        <TweenOne animation={{ opacity: 1 }} style={{ opacity: 0 }} key="title"
          className="page2-title"
        >
          在页面80％时进入
        </TweenOne>
        <Animate key="0" transitionName="fade" transitionAppear>
          <div className="demo"></div>
        </Animate>
        <TweenOne
          className="demo"
          animation={{ y: 0, opacity: 1 }}
          key="1"
          style={{ transform: 'translateY(100px)', opacity: 0 }}
        />
      </ScrollOverPack>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('example'));