import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Child from './Child';
import Child1 from './Child1';

/**
 * prop 的变化 同步到 state 的方法
 * - getDerivedStateFromProps https://github.com/facebook/react/issues/14830#issuecomment-554293547
 * - useEffect https://stackoverflow.com/questions/54130948/how-to-change-props-to-state-in-react-hooks
 * - useEffect https://learnwithparam.com/blog/how-to-pass-props-to-state-properly-in-react-hooks/
 */

const Index = () => {
  const [info, setInfo] = useState(null)
  const [cur, setCur] = useState(1)

  const onClick = () => {
    setInfo({
      name: Math.random(),
      age: Math.random(),
    })
  }

  return (
    <div>
      <button onClick={onClick}>先点我</button> &nbsp;
      <button onClick={() => setCur(Math.random())}>点我不影响 info {cur}</button>
      <button onClick={() => setInfo(null)}>销毁 Child1</button>
      <Child info={info} />
      {info ? <Child1 /> : null}
    </div>
  )
}

ReactDOM.render(
  <Index />
  , document.getElementById('example'));
