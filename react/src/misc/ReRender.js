import React, { useState, useEffect } from 'react';

export default (props) => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);

  function handleClick() {
    setCount(c => c + 1);
    setFlag(f => !f);
    // 更新 UI 一次
  }

  useEffect(() => {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 更新 UI 两次
    }, 1000);
  }, []);

  console.log('re render count');

  return (
    <div>
      <button onClick={handleClick}>re render</button>
    </div>
  );
}
