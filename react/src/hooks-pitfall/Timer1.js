import React, { useState, useEffect } from 'react';

export default (props) => {
  const [count, setCount] = React.useState(0);

  const increase = useCallback(() => {
    setCount(count + 1);
    // 函数式方法更新 count 会加 1
    // setValue(prevValue => prevValue + someResult)
    // setCount(count => count + 1);
  }, [count]);
  
  const handleClick = () => {
    increase();
    increase();
    increase();
    // 相当于
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  };
  
  return (
    <>
      <button onClick={handleClick}>+</button>
      <div>Counter: {count}</div>
    </>
  );
}
