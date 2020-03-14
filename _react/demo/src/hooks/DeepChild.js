import React, { useContext } from 'react';
import { TodosDispatch } from './context';

export default ({ todos }) => {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo {JSON.stringify(todos)}</button>
  );
}
