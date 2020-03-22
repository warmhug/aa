import React, { useState, useEffect, useReducer, useCallback } from 'react';
import ReactDOM from 'react-dom';
import useEventCallback from './useEventCallback';
import usePrevious from './usePrevious';
import Child from './Child';
import DeepChild from './DeepChild';
import { TodosDispatch } from './context';
import { todosReducer, init } from './reducer';

const Index = () => {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer, 'default', init);

  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [text, updateText] = useState('');
  console.log('text change', text);

  const prevCount = usePrevious(count);

  // 即便 `text` 变了也会被记住:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);
  const handleSubmit1 = () => {
    alert(text)
  }

  // setTimeout
  const onAlert = useCallback(() => {
    setTimeout(() => {
      alert('Value: ' + count)
    }, 5000)
  }, [count])

  useEffect(() => {
    console.log('count change')
    return () => {
      console.log('count cleanup')
    }
  }, [count])

  useEffect(() => {
    console.log('count1 change')
    return () => {
      console.log('count1 cleanup')
    }
  }, [count1])

  return (<div>
    <button onClick={() => setCount(count + 1)}>btn1 {count} {prevCount}</button>
    <button onClick={() => setCount1(count1 + 1)}>btn2 {count1}</button>
    <button onClick={onAlert}>点我后，再点 btn1</button>
    <input value={text} onChange={e => updateText(e.target.value)} />
    <button onClick={handleSubmit}>提交</button>
    <Child onClick={handleSubmit} />
    {/* <Child onClick={handleSubmit1} /> */}
    <TodosDispatch.Provider value={dispatch}>
      <DeepChild todos={todos} />
    </TodosDispatch.Provider>
  </div>)
}

ReactDOM.render(
  <Index />
, document.getElementById('example'));